var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");
var mysql = require('mysql');
var CryptoJS = require("crypto-js"); // подключим алгоритм хеширования
let fs = require('fs');
let PixelDiff = require('pixel-diff'); //сравнение отпечатков (изображений)

//настроим БД
var conn = mysql.createConnection({ 
    database: 'security',
    host: "localhost",
    user: "root",
    password: "password",
    multipleStatements: true
  });


  app.get('/', function(req,res){
       res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/auth', function(req,res){
    res.sendFile(__dirname + '/public/auth.html');
});

app.get('/simulation', function(req,res){
    res.sendFile(__dirname + '/public/simulation.html');
});
  



app.use(express.static(__dirname+'/public'));

function isNumeric(n){
    return !isNaN(parseFloat(n))&&isFinite(n);
}




conn.connect(function(err) {
    if (err) throw err;
    console.log("Соединение прошло успешно");
  });






//ДАТА И ВРЕМЯ---------------------------------------------------------------------------------------------------------    

    //добавляет 0 вперед числа если нужно для времени
function prettyTime(number) {
    if(number<10&&number.toString().length!=2)
    return "0"+number;

    return number;
}


//принимает дату в виде день.месяц.год
function prettyDate(dateString){
    let [day,month,year] = dateString.split('.');

    if(year.toString().length==2){
        switch(true){
            //если 20й век
            case year>30:
              year= (+year) + 1900;
              break;

            default:
              year= (+year) + 2000;
        }
    }
   
   

    if(month.toString()[0]!='0')
    month = prettyTime(month);
   
    return `${year}-${month}-${prettyTime(day)}`;
    
   }




//ДАТА И ВРЕМЯ: КОНЕЦ-------------------------------------------------------------------------------------------------------  

//СТРАНИЦЫ -----------------------------------------------------------------------------------------------------------------

//посчитатать количество страниц и вернуть в отдельном массиве
function computePages(page, numberOfPages) {
   
    let availablePages = [];
 
     switch(true) { //вариации страниц
                                            
 
         case page==1&&numberOfPages==1: //если есть только первая страница
         availablePages=[1];
         break;
         
         case page==1&&numberOfPages==2: //если первая страница и впереди 1 доступная
         availablePages=[1,2];
         break;
 
         case page==1&&numberOfPages>=3: //если первая страница и впереди 2 доступных
         availablePages=[1,2,3];
         break;
 
         case page==numberOfPages: //впереди нет страниц, конечная
         availablePages=[page-1,page]
         break;
 
         case page!=1&&page!=numberOfPages: //одна доступная впереди
         availablePages = [page-1,page,page+1]; 
         break;
 
      
 
     }
 
     return availablePages;
 
 }



 //посчитать количество страниц
function calculatePageNumber(allFields, fieldsPerPage) {
   
    let numberOfPages = 1;//количество страниц
    while (allFields>fieldsPerPage) //пока количество страниц больше чем на одной странице
    {
     numberOfPages++;
     allFields-=fieldsPerPage;
    }

    return numberOfPages;
}

//получить страницы; allFields - элементы массива
function getPages(allFields, fieldsPerPage,page){
    let pageNumber = calculatePageNumber(allFields, fieldsPerPage);
    let availablePages = computePages(page,pageNumber);
    return availablePages;
}


//СТРАНИЦЫ : КОНЕЦ -----------------------------------------------------------------------------------------------------------

io.on('connection', function(socket){
   
//---------------------------------ОТДЕЛ БЕЗОПАСНОСТИ-------------------------------------------------------------------------







//отослать информацию о сотрудниках учитывая страницы  
socket.on('getUsers', function(data){
    //номер страницы и количество записей
    let sqlQuery;
    let {page, fieldsPerPage} = data;
sqlQuery = `SELECT  id,name,surname,farthername,speciality FROM user ORDER BY id 
            LIMIT ${(+page-1)*fieldsPerPage},${fieldsPerPage}`;
   
//извлекаем запись
return new Promise((resolve, reject) => {
    conn.query(sqlQuery,(err, result)=>{
        if(err) console.log(err);
        if(!result||!result.length) return;

        resolve(result);
    });

} ) //конец промиса
 //узнаем число страниц
 .then((data)=>{
    sqlQuery = `SELECT COUNT(*) AS numbers FROM user`;

 
    
    conn.query(sqlQuery, (err , result)=>{
        if(err) console.log(err);
        if(!result||!result.length) return;

        let availablePages = getPages( result[0].numbers, fieldsPerPage, page); 
        socket.emit('$getUsers', {data, availablePages, page});
    });

 })
 .catch((err)=>{
     console.log(err);
 }); 


});

//РАБОТА С ОТПЕЧАТКАМИ ----------------------------------------------------------------------------------------------------

//получить отпечаток
socket.on('getFingerInfo', (id)=>{
  let sqlQuery = `SELECT bt.idealImage, u.surname, u.name, u.farthername FROM bioTemplate AS bt 
  INNER JOIN user AS u ON u.id=bt.id AND u.id=${id}`;

  //данные конкретного пользователя
  return new Promise((resolve, reject)=>{

    conn.query(sqlQuery, (err, result)=>{
        if(err) console.log(err);
        if(!result||!result.length) return;

  
        resolve(result[0]);
    });

  })//конец промиса
  //считаем сам отпечаток
  .then((data)=>{
        let imgName = `./public/fingers/${data.idealImage}.png`;

        fs.readFile(imgName, (err, result)=>{
            if(err) console.log(err);

                    
        //cобираем все в один обьект
        let info = Object.assign({}, {...data}, {id}, {finger : result} );
        
        socket.emit('$getFingerInfo', info);

        })
  })
  
  .catch((err)=> console.log(err));
 

});

//ОБНОВИТЬ ОТПЕЧАТКИ НА ПОЛЬЗОВАТЕЛЕ
socket.on('updateFingerprint', (data)=>{
   let {pin, finger,id} = data;

   //найти пользователя по id
   return new Promise((resolve, reject)=>{
            let sqlQuery = `SELECT idealImage FROM bioTemplate WHERE id=${id}`;
            conn.query(sqlQuery, (err, result)=>{
               if(err) console.log(err);
               if(!result||!result.length) return;
               
               resolve(result[0].idealImage);

 
            });
   })//конец промиса
   //удалить старое изображение
   .then((idealImage)=>{
       //название файла
       let fileName = `./public/fingers/${idealImage}.png`;    
        
       return new Promise((resolve, reject)=>{
       console.log(fileName);
       fs.unlink(fileName, function(err){
            if(err) console.log(err);
            resolve();
       });

    });


   })
   //занести информация о изображении в базу
   .then(()=>{
       let name = CryptoJS.SHA256(pin).toString();
       let sqlQuery = `UPDATE bioTemplate SET idealImage = '${name}' WHERE  id=${id}`;

       return new Promise((resolve, reject)=>{
          conn.query(sqlQuery, function(err){
                 if(err) console.log(err);
                 resolve(name);
          });
       });
        

   })
   //добавить изображение в папку
   .then((name)=>{
    let buffer = Buffer.from(finger);
    fs.writeFile(`./public/fingers/${name}.png`, buffer,'binary', (err)=>{
        if(err) console.log(err);
   });
      
   })
   .catch((err)=>console.log(err));
    

});



//ДОБАВЛЕНИЕ БИОМЕТРИЧЕСКИХ ШАБЛОНОВ
//добавление пользователя в систему
socket.on('addUser', (data)=>{
    //личные данные пользователя
    let {name,surname,farthername,speciality,accessLevel,date} = data;
    //данные для добавления отпечатка
    let {pin, finger} = data;
     //записываем название изображения на сервере
     let imgName =  CryptoJS.SHA256(pin).toString();

    //вытягиваем необходимый буфер
    let buffer = Buffer.from(finger);

//занесем пользователя в систему
let sqlQuery = `INSERT INTO user (name,surname,farthername,speciality,accessLevel,date) 
    VALUES ("${name}","${surname}","${farthername}","${speciality}",${accessLevel}
    ,'${prettyDate(date)}')`;


 return new Promise((resolve, reject)=>{
    conn.query(sqlQuery, function(err){
        if(err) console.log(err);
        resolve();
    });
  }) //конец промиса

//запишем изображение
.then(()=>{

  return new Promise((resolve, reject)=>{
    fs.writeFile(`./public/fingers/${imgName}.png`, buffer,'binary', (err)=>{
         if(err) console.log(err);
         resolve();
    });
  })
   
       
    })
    //определим id только что добавленного пользователя
    .then(()=>{
        
         let sqlQuery = `SELECT id FROM user WHERE TRIM(name)=TRIM('${name}') AND TRIM(surname)=TRIM('${surname}')
        AND TRIM(farthername)=TRIM('${farthername}') AND TRIM(speciality)=TRIM('${speciality}')
        AND accessLevel=${accessLevel}`;

        return new Promise((resolve, reject)=>{
        conn.query(sqlQuery, function(err, result){
            if(err) console.log(err);
            if(!result||!result.length) return;
           
            resolve(result[0].id);
        })

        });//конец промиса
    })
    //запишем в базу данных сведения о биометрии
    //будем хранить в базе название отпечатка расположенного в ./public/fingers
    .then((id)=>{
      let sqlQuery = `INSERT INTO bioTemplate VALUES('${id}', '${imgName}')`;

      conn.query(sqlQuery, function(err){
             if(err) console.log(err);
            
             socket.broadcast.emit("$updateUsers");
             socket.emit("$updateUsers");
             
      });

    })
    .catch(err=>console.log(err));
  
});

//ДОБАВЛЕНИЕ БИОМЕТРИЧЕСКИХ ШАБЛОНОВ : КОНЕЦ

 //РАБОТА С ОТПЕЧАТКАМИ : КОНЕЦ ---------------------------------------------------------------------------------------------


//запрос детальной информации по пользователю
socket.on('getDetailUserInfo', (data)=>{
    let {id} = data;
    let sqlQuery = `SELECT id,name,surname,farthername,speciality,
    DATE_FORMAT(date, '%d.%m.%Y') AS date,accessLevel FROM user WHERE id=${id}`;
     
    conn.query(sqlQuery, (err, result)=>{
         if(err) console.log(err);
         if(!result||!result.length) return;

          socket.emit('$getDetailUserInfo', result);

     });
     
});

//изменить данные сотрудника
socket.on('changeUserData', (data)=>{
   let {id,name,surname,farthername,speciality,accessLevel,date} = data;
   let sqlQuery = `UPDATE user SET name='${name}',surname='${surname}',farthername='${farthername}',
   speciality='${speciality}',accessLevel='${accessLevel}',date='${prettyDate(date)}' WHERE id=${id}`;
 
     conn.query(sqlQuery, function(err){
        if(err) console.log(err);
      });   
});

//удалить данные одного сотрудника из базы
socket.on('deleteUserData', (userID)=>{
     let sqlQuery = `DELETE FROM user WHERE id=${userID}`;

     socket.broadcast.emit("$updateUsers");
     socket.emit("$updateUsers");

     conn.query(sqlQuery, (err)=>{
           if(err) console.log(err);
     });
    
});

//поиск информации по заданным параметрам
socket.on('searchInfo', (info) =>{
       const {data, page,fieldsPerPage} = info;
       
   
      let keys = Object.keys(data);
      let sqlQuery = `SELECT * FROM user WHERE `;
      let constraint = `LIMIT ${(+page-1)*fieldsPerPage},${fieldsPerPage}`;
      let withoutConstraint;
      for(let i=0; i<keys.length; i++){ 
         //если последний или первый и последний одновременно
        if(i == keys.length-1){
            sqlQuery+=` ${keys[i]} LIKE '${data[keys[i]]}%'  `;
            withoutConstraint = sqlQuery;
            sqlQuery+=` ${constraint} `;
            break;
        }
        
 
        sqlQuery+=` ${keys[i]} LIKE '${data[keys[i]]}%' AND `;

      }

//данные
return new Promise((resolve,reject)=>{
    conn.query(sqlQuery, (err, result)=>{
          if(err) console.log(err);
          if(!result||!result.length) return;
            
          resolve(result);
        //   socket.emit('$searchInfo',result);
    });
   })
   //получить количество и сгенерировать страницы
   .then((data)=>{
       sqlQuery = withoutConstraint.replace(/\*/, 'COUNT(*) AS numbers');
       conn.query(sqlQuery, (err , result)=>{
        if(err) console.log(err);
      
        if(!result||!result.length) return;
           
        let availablePages = getPages( result[0].numbers, fieldsPerPage, page);
        socket.emit('$searchInfo', {data, availablePages, page});
    });
       
    })
    .catch((err)=>console.log(err));

});



//добавление отдела
 socket.on('addDept', (data)=>{
     let {deptName, deptAccessLevel} = data;
     let sqlQuery = `INSERT INTO dept VALUES('${deptName}','${deptAccessLevel}')`;

     conn.query(sqlQuery, (err)=>{
         if(err) console.log(err);
         socket.broadcast.emit('$updateDepts');
         socket.emit('$updateDepts');
     });

 });

 //отправить данные существующих отделов
 socket.on('getDeptData', ()=>{
   let sqlQuery = 'SELECT * FROM dept ORDER BY deptName';
   conn.query(sqlQuery, (err, result)=>{
         if(err) console.log(err);
         if(!result||!result.length) return;
         socket.emit('$getDeptData',result);
   });
   
 });
 //удалить отдел
 socket.on('deleteDept', (deptName)=>{
   let sqlQuery = `DELETE FROM dept WHERE TRIM(deptName)=TRIM('${deptName}')`;
   conn.query(sqlQuery, (err)=>{
        if(err) console.log(err);
   });
 });

  //изменить отдел
  socket.on('editDept', (data)=>{

let {oldDeptName, deptName,accessLevel} = data;
let sqlQuery = `UPDATE dept SET deptName='${deptName}', accessLevel='${accessLevel}' WHERE TRIM(deptName)=TRIM('${oldDeptName}')`;
    conn.query(sqlQuery, (err)=>{
        if(err) console.log();
    });
 
  });


  

// получить данные о доступах
  socket.on('getAccess', ()=>{
    let sqlQuery = `SELECT time,  DATE_FORMAT(date, '%d.%m.%Y') AS date, deptName FROM access ORDER BY date DESC, time DESC`;
    conn.query(sqlQuery, (err , result)=>{
           if(err) console.log(err);
           if(!result||!result.length)  return;

           socket.emit('$getAccess', result);
    });
});

 //получить данные о нарушениях
  socket.on('getViolation', ()=>{
let sqlQuery = `SELECT time,  DATE_FORMAT(date, '%d.%m.%Y') AS date, dept as deptName FROM violation ORDER BY date DESC, time DESC`;
    conn.query(sqlQuery, (err , result)=>{
           if(err) console.log(err);
           if(!result||!result.length)  return;

           socket.emit('$getViolation', result);
    });
  });


//информация о текущем допуске
socket.on('getCurrentAccessInfo', (data)=>{
    let {deptName, date, time} = data;

    let sqlQuery = `SELECT a.deptName, DATE_FORMAT(a.date, '%d.%m.%Y') AS date,a.time,a.id,u.surname, u.name, u.farthername, u.speciality, u.accessLevel FROM 
    access AS a INNER JOIN user AS u ON a.id=u.id AND TRIM(a.deptName)=TRIM('${deptName}') AND a.date="${prettyDate(date)}"
    AND a.time="${time}"`;
  
    conn.query(sqlQuery, (err, result)=>{
        if(err) console.log(err);
        if(!result||!result.length) return;

        socket.emit( "$getCurrentAccessInfo", result[0] );

    });

});

//информация о текущем нарушении
socket.on('getCurrentViolationInfo', (data)=>{

    let {deptName, date, time} = data;

    let sqlQuery = `SELECT v.dept, v.type, DATE_FORMAT(v.date, '%d.%m.%Y') AS date,v.time,u.id,u.surname, u.name, u.farthername, u.speciality, u.accessLevel FROM 
    violation AS v INNER JOIN user AS u ON v.violatorID=u.id AND TRIM(v.dept)=TRIM('${deptName}') AND v.date="${prettyDate(date)}"
    AND v.time="${time}"`;

    conn.query(sqlQuery, (err, result)=>{
        if(err) console.log(err);
        if(!result||!result.length) return;

        socket.emit( "$getCurrentViolationInfo", result[0] );

    });
    
});

//удалить допуски за период
socket.on("deletePeriodAccess", (data)=>{

       let { startDate, endDate, startTime, endTime} = data;
       let sqlQuery;
                                                               // в день старта
       sqlQuery = `DELETE FROM access WHERE (date = '${prettyDate(startDate)}' AND time >= '${startTime}') OR 
       (date> '${prettyDate(startDate)}' AND date< '${prettyDate(endDate)}') 
       OR ((date = '${prettyDate(endDate)}' AND time <= '${endTime}'))`; //охватили все периоды
       
       if(startDate==endDate)
       sqlQuery = `DELETE FROM access WHERE date = '${prettyDate(startDate)}' AND time >= '${startTime}'
        AND time <= '${endTime}'`; //охватили все периоды


       socket.broadcast.emit('$updateAccess');
       socket.emit('$updateAccess');
  
       conn.query(sqlQuery, (err)=>{
            if(err) console.log(err);
          

       });
       
});

//удалить допуски за период
socket.on("deletePeriodViolation", (data)=>{
    let { startDate, endDate, startTime, endTime} = data;
                                                            // в день старта
    let sqlQuery = `DELETE FROM violation WHERE (date = '${prettyDate(startDate)}' AND time >= '${startTime}') OR 
    (date> '${prettyDate(startDate)}' AND date< '${prettyDate(endDate)}') 
    OR ((date = '${prettyDate(endDate)}' AND time <= '${endTime}'))`; //охватили все периоды

    if(startDate==endDate)
    sqlQuery = `DELETE FROM violation WHERE (ate = '${prettyDate(startDate)}' AND time >= '${startTime}'
     AND time <= '${endTime}'`; //охватили все периоды

    socket.broadcast.emit('$updateViolation');
    socket.emit('$updateViolation');


    conn.query(sqlQuery, (err)=>{
         if(err) console.log(err);

    });
    
});


//вернуть список нарушений на конкретного пользователя
socket.on('userViolations', (userId)=>{
    let sqlQuery = `SELECT DATE_FORMAT(date, '%d.%m.%Y') AS date,type,time,dept FROM violation WHERE violatorID=${userId}`;

    conn.query(sqlQuery, (err, result)=>{
            if(err) console.log(err);
            if(!result) return;

           
            socket.emit('$userViolations', result);
    });

});



//----------------------------ОТДЕЛ БЕЗОПАСНОСТИ : КОНЕЦ----------------------------------------------------------------------

//----------------------------------------СИМУЛЯЦИЯ ВХОДА---------------------------------------------------------------------



//ПРОЦЕДУРА ВХОДА В СИСТЕМУ 
socket.on('deptLogin', (data)=>{
    let {pin, finger,deptName} = data;
    let id = "";
 
    //взять адрес изображения по ПИН-коду
    return new Promise((resolve, reject)=>{
           let pinHash = CryptoJS.SHA256(pin).toString();
           let sqlQuery = `SELECT id,idealImage FROM bioTemplate WHERE idealImage='${pinHash}'`;
             conn.query(sqlQuery, (err ,result)=>{
                 if(err) console.log(err);
                 if(!result || !result.length) return;
 
                 ({id} = result[0]);
              
                 resolve(result[0].idealImage);
 
             });
 
   
         })//конец промиса
         //взять изображение для сравнения
         .then((idealImage)=>{
             return new Promise((resolve, reject)=>{
                 fs.readFile(`./public/fingers/${idealImage}.png`, (err, result)=>{
 
                     if(err) console.log(err);
                     
                     resolve(result);
 
                 });
 
             }); 
            
         })//конец промиса
 
         //сравнить отпечатки
         .then((idealImage)=>{
          
             let diff = new PixelDiff({
                 imageA: idealImage,
                 imageB: finger,
              
                 thresholdType: PixelDiff.RESULT_IDENTICAL,
               
             });
 
 
             return new Promise((resolve, reject)=>{
 
                 diff.run((error, result) => {
                     if (error) {
                        console.log(error);
                     } else {
                     //    console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
                     //    console.log('Found ' + result.differences + ' differences.');
                  
                       let percentOfSimilarity =   Math.round((100 -  100 * (result.differences /(result.dimension))) *100)/100;
         //обьект проходной        
         let exitObject = {
             status : '' // violation или access
         };
                       if(percentOfSimilarity<80){
                           console.log("Меньше 80% сходства");
                           exitObject.status = "violation";
                           
                       }else{
                           exitObject.status = "access";
                       }
 
                    resolve(exitObject);
                      
                     }
                  });
     
 
             });
         })

 
         //действия в зависимости от status
         .then((exitObject)=>{
             let {status} = exitObject;
             let sqlQuery = ``;
             let date = new Date();
             //дата
             let now = `${prettyTime(date.getDate())}.${prettyTime(date.getMonth()+1)}.${date.getFullYear()}`;
             //время
             let time =  `${prettyTime(date.getHours())}:${prettyTime(date.getMinutes())}:${prettyTime(date.getSeconds())}`;

             switch(status){
                case "violation":
          sqlQuery = `INSERT INTO violation VALUES("Проникновение","${prettyDate(now)}","${time}",'${deptName}', ${id} )`;

           socket.broadcast.emit('$alarm');
           socket.broadcast.emit('$updateViolations');
 
                  break;
                case "access":
               
          sqlQuery = `INSERT INTO access VALUES(${id}, '${deptName}', '${prettyDate(now)}', '${time}' )`;

          socket.broadcast.emit('$updateAccess');
                  break;
             }
              
             conn.query(sqlQuery, (err)=>{
                if(err) console.log(err);
             });
             
              
 
         })
 
         
 
         .catch((err)=>{
             console.log(err);
         });
    
 
 });
 
 
 
 
 

//-------------------------------------СИМУЛЯЦИЯ ВХОДА : КОНЕЦ ---------------------------------------------------------------


}); //конец io



http.listen(3000,function(){
    console.log("Соединено успешно!");
});