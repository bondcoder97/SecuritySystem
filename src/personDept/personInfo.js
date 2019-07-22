import React, {Component,Fragment} from 'react';
import {store} from '../../public/store/index';
import {setPersonMode} from '../../public/actions';
import SearchField from './searchField';
import DeptTable from './deptTable';
import FingerModal from './fingerModal';
import ExitTable from './exitTable';
import DeletingExit from './deletingExit';

//модалка пользовательского нарушения
class UserViolationModal extends Component{
   constructor(props){
      super(props);
   }

   render(){
       const {modalInfo,headers} = this.props;
       let info = modalInfo;
       console.log(info);
       let name,surname,farthername,id;
       
       if(store.getState().currentUserData[0])
       ({name,surname, farthername, id} =  store.getState().currentUserData[0]);
       
       return (<Fragment>
            <div id="userViolationModal" class="modal">
               <div class="modal-content">
    {name&&surname&&farthername&&id  ? <h5 className="modal-title">{`${surname} ${name} ${farthername} (id: ${id})`}</h5>: null}

            
            
              
 
 </div>
 

 {info.length?<table className="highlight">
  <thead>
       <tr>
              {headers&&headers.length?
                 headers.map((item)=>{
                      return (<th key={item}>{item} </th>)
                }):null}
                </tr>
   </thead>
  <tbody className="exit">
  
  {info&&info.length?
              info.map((item)=>{
                
                return (<tr key={item.deptName}>
             <td>{item.type}</td>
            <td>{item.dept}</td>
            <td>{item.date}</td> 
            <td>{item.time}</td> 

                </tr>)
                }): null }
  
    </tbody>
  </table> : <h4 className="violationMessage" violationMessage> Нарушений не имеется!</h4>}
  
 
 
               <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
     </div>
   </div>

       </Fragment>);
   }

}

//сделаем 2 наследника для полной замены компонента
class DeletionViolation extends DeletingExit{
  constructor(props){
       super(props);
  }
}
//сделаем 2 наследника для полной замены компонента
class DeletionAccess extends DeletingExit{
  constructor(props){
       super(props);
  }
}


//модальное окно доступов
class AccessModal extends Component{
    constructor(props){
      super(props);

    }

   render(){
     let {modalInfo} = this.props;
     let {name,surname, farthername,deptName,speciality,date,time,id,accessLevel} = modalInfo;
   
     return (<Fragment>
        <div id="accessModal" class="modal">
               <div class="modal-content">
                <h5 className="modal-title">{`${surname} ${name} ${farthername} (id: ${id})`}</h5>
            
            
           <div className="row"> 
              <label className="col s6"> Специальность
                <input type="text" readOnly value={speciality}/>
              </label>

              <label className="col s6"> Пропускной пункт
                <input type="text" readOnly value={deptName}/>
              </label>

              <label className="col s5"> Дата
                <input type="text" readOnly value={date}/>
              </label>

              <label className="col s4"> Время
                <input type="text" readOnly value={time}/>
              </label>

              <label className="col s3"> Уровень доступа
                <input type="text" readOnly value={accessLevel}/>
              </label>

           </div>
 
 </div>
 
   
  
 
 
               <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
     </div>
   </div>
     </Fragment>);
   }

}


//модальное окно нарушений
class ViolationModal extends  Component{
  constructor(props){
    super(props);

  }

 render(){
  let {modalInfo} = this.props;
  let {name,surname, farthername,dept,speciality,date,time,id,accessLevel,type} = modalInfo;
   return (<Fragment>
      <div id="violationModal" class="modal">
             <div class="modal-content">
              <h5 className="modal-title">{`${type}`}</h5>
          
          
          
              <div className="row"> 
              <label className="col s4"> Фамилия
                <input type="text" readOnly value={surname}/>
              </label>
               
              <label className="col s4"> Имя
                <input type="text" readOnly value={name}/>
              </label>

              <label className="col s4"> Отчество
                <input type="text" readOnly value={farthername}/>
              </label>

              <label className="col s2"> id
                <input type="text" readOnly value={id}/>
              </label>

        

              <label className="col s5"> Специальность
                <input type="text" readOnly value={speciality}/>
              </label>

              <label className="col s5"> Пропускной пункт
                <input type="text" readOnly value={dept}/>
              </label>

              <label className="col s5"> Дата
                <input type="text" readOnly value={date}/>
              </label>

              <label className="col s4"> Время
                <input type="text" readOnly value={time}/>
              </label>

              <label className="col s3"> Уровень доступа
                <input type="text" readOnly value={accessLevel}/>
              </label>

           </div>

</div>

 



             <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
   </div>
 </div>
   </Fragment>);
 }

}


//сделаем для перерисовки
class ViolationTable extends ExitTable{
  constructor(props){
       super(props);
  }
}

class AccessTable extends ExitTable{
  constructor(props){
       super(props);
  }
}


//отображение информации конкретного пользователя
class PersonInfo extends Component{
    constructor(props){
        super(props);
        this.state={
          personMode : '', //режим в котором меню
          name:'',
          surname:'',
          farthername:'',
          speciality: "",
          accessLevel : '',
          //состояние из информационных input
          infoDate: '',
          infoName:'',
          infoSurname:'',
          infoFarthername:'',
          infoSpeciality: "",
          infoAccessLevel : '',
          //добавление отдела
          deptName : '',
          deptAccessLevel : '',

          deptData: [],

          pin: "" , //пин-код пользователя

          //модальное окно просмотра отпечатков
          modalInfo : {},

          accessData : [], //данные пропусков
          violationData : [], //данные нарушений

          accessCurrentData:{}, // пропуск
          violationCurrentData: {}, // нарушение

          userViolationData: [] //нарушения конкретного пользователя
           

        }
        //контроллеры модальных окон
        this.modalController;//обновление отпечатка
        this.modalAccessController; //проходы
        this.modalViolationController;//нарушения
        this.modalUserViolation; //нарушение конкретного пользователя
        
           

        //ссылка  на первое изображение для фокуса
        this.firstImage = React.createRef();
    }

    //ввод значения в INPUT
    onValueInput = (property,{target:{value}})=>{
         this.setState({
              [`${property}`]: value
         });
    }
        

//нажатие на иконку с пользователем 
onAccountIconClick = (e)=>{
    changeMenuItem(e,'userInfo');
}
//нажатие на иконку меню с добавление пользователя 
onAddUserIconClick = (e)=>{

  changeMenuItem(e, 'addUser');
   this.onAddItemChanges();
}


//кнопка добавления отдела
onAddDeptIconClick = (e)=>{
  
    changeMenuItem(e, 'addDept');
}
//иконка поиска
onSearchIconClick = (e)=>{
    changeMenuItem(e,'search');
}

//иконка журнала доступа
onAccessIconClick = (e)=>{
  changeMenuItem(e,'access');
}

//иконка нарушений
onViolationIconClick = (e)=>{
  let {switchOffFlasher} = this.props;

  changeMenuItem(e,'violation');
  switchOffFlasher();
}


//добавление отдела
onAddDeptButtonClick = () =>{
const {deptName, deptAccessLevel} = this.state;

//не заполнены
if(!deptName||!deptAccessLevel) return;

 socket.emit('addDept', {deptName, deptAccessLevel});
  
}

//кнопка добавленяи пользователя
onAddUserButtonClick = (e) => {
 

     let date = document.querySelector('.datepicker').value;

    const {name,surname,farthername,speciality,accessLevel,pin} = this.state;


let fileReader = new FileReader();

//прикрепленное изображение
  let myFile = document.querySelector('#myFile');
   let blob = new Blob([myFile.files[0]], {type:'img/png'});


fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {
  let finger = fileReader.result;
  
      //если поля не заполнены
      if( !(name&&surname&&farthername&&date&&speciality&&accessLevel&&pin) ) return;


      socket.emit('addUser', {name,surname,farthername,date,speciality,accessLevel,pin,finger});


};
 


    
   


  }

  //на изменение отпечатка пальца
  onImageFileChange = (e)=>{
    //картинка отпечатка
    let finger = e.target.closest(".row").querySelector('img');
  
    //отображаем выбранный отпечаток
    let blob = new Blob([e.target.files[0]], {type:"img/png"});

    let urlValue = URL.createObjectURL(blob);

    finger.src = urlValue;
    URL.revokeObjectURL(blob);



      
  }

  //инициализация модалки отпечатков
  makeFingerModal = () =>{


      var elems = document.querySelector('#fingerModal');
      this.modalController = M.Modal.init(elems);
      
   

  }

    //инициализация модалки доступа
  makeAccessModal = () =>{


    var elems = document.querySelector('#accessModal');
    this.modalAccessController = M.Modal.init(elems);
    
 

}

    //инициализация модалки нарушений
    makeViolationModal = () =>{


      var elems = document.querySelector('#violationModal');
      this.modalViolationController = M.Modal.init(elems);
      
   
  
  }


    //инициализация модалки нарушений
    makeViolationUserModal = () =>{


      var elems = document.querySelector('#userViolationModal');
      this.modalUserViolation  = M.Modal.init(elems);
      
   
  
  }

  //нажатие на кнопку для активирования модалки конкретного пользователя
  onUserViolationClick = () => {

    if( !store.getState().currentUserData[0]) return;
    socket.emit('userViolations', store.getState().currentUserData[0].id); //запросим все нарушения пользователя

  }

  //нажатие на кнопку активирования модального окна
  omFingerTriggerClick = () => {
    const {infoName, infoSurname, infoFarthername} = this.state;

    if(!infoName||!infoSurname||!infoFarthername) return;

    let currentID = store.getState().currentUserData[0].id;

 

    socket.emit('getFingerInfo', currentID);
  }

//динамически генерируем содержимое карточки
  cardContent = (param) =>{
    const {name,surname,farthername,speciality,accessLevel} = this.state;
    const {infoAccessLevel,infoDate,infoFarthername,infoSurname,infoName,infoSpeciality} = this.state;
    //операции с отделами
    const {deptData} = this.state;
     
    //добавление изображения
    const {pin} = this.state;

    //информация для модального окна
    const {modalInfo} = this.state;

    //данные проходной
    const {accessData, violationData} = this.state;

    //данные одного прохода
    const {accessCurrentData, violationCurrentData} = this.state;

    //список нарушений конкретного пользователя
    const {userViolationData} = this.state;




    switch(param){
      // ДОБАВЛЕНИЕ СОТРУДНИКА ------------------------------------------------------------------------------------------
        case 'addUser':
          return (<Fragment>
         <div class="card ">
    
        <div class="card-content">
            
            <h6 class="cardCaption">Новый сотрудник</h6>        
             <input type="text" placeholder="Имя" value={name} onInput={this.onValueInput.bind(this,'name')}/>
             <input type="text" placeholder="Фамилия" value={surname} onInput={this.onValueInput.bind(this,'surname')}/>
             <input type="text" placeholder="Отчество" value={farthername} onInput={this.onValueInput.bind(this,'farthername')} />
             <input type="text" class="datepicker" placeholder="Дата рождения"  />


     <input type="text" placeholder="Специальность" value={speciality} onInput={this.onValueInput.bind(this,'speciality')} />
     <input type="text" placeholder="Уровень доступа" value={accessLevel} onInput={this.onValueInput.bind(this,'accessLevel')}/>
             {/* <input type="file" placeholder="Снимок" /> */}

    <div className="row"> 
        <div className="col s5">
        <img  width="100px" height="100px" id="fingerImg"/>
        </div>

   
        <div className="col s7">


        <input type="text"
         value={pin}
         placeholder="ПИН-код" 
         onInput={this.onValueInput.bind(this, 'pin')}
         />

       <label id="finger">

        <span class="btn #5e35b1 deep-purple darken-1" title="PNG формат!" > Выберите файл </span> 
          <input type="file" id="myFile" onChange={this.onImageFileChange} /> 
        </label>
   



        </div>

     </div>



        </div>
        <div class="card-action">
          <a onClick={this.onAddUserButtonClick} href="#">Добавить</a>
          {/* <a onClick={this.onFileTestClick} href="#">Тест</a> */}
        </div>
      </div>
         </Fragment>);

  //ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ------------------------------------------------------------------------------------
        case '':
        case 'userInfo':
             return (<Fragment>

          <div class="card ">
 
        <div class="card-content">

                <h6 class="cardCaption">Информация о сотруднике</h6>  

 <label> Имя :  
 <input type="text" placeholder="Имя" 
                 onInput={this.onValueInput.bind(this,'infoName')}
                 value={infoName? infoName :""}/> 
 </label>


<label > Фамилия :<input type="text" placeholder="Фамилия" 
                 onInput={this.onValueInput.bind(this,'infoSurname')}
                 value={infoSurname ? infoSurname:""} /> </label> 

<label>Отчество :  <input type="text" placeholder="Отчество"  
                onInput={this.onValueInput.bind(this,'infoFarthername')}
               value={infoFarthername ? infoFarthername :""}/> </label>
<div className="row">
<div className="col s6"><label > Дата рождения : <input type="text" placeholder="Дата рождения"
                onInput={this.onValueInput.bind(this,'infoDate')}
               value={infoDate ? infoDate : ""} /> </label> </div>
<div className="col s6"><label > Уровень доступа : 
 <input type="text" placeholder="Уровень доступа"  
                 onInput={this.onValueInput.bind(this,'infoAccessLevel')}
                value={infoAccessLevel ? infoAccessLevel :""}/> 
 </label>
 </div>
 </div>

 <div className="row">
 <div className="col s8">
<label>  Специальность : <input type="text" placeholder="Специальность"
                  onInput={this.onValueInput.bind(this,'infoSpeciality')}  
                 value={infoSpeciality ? infoSpeciality :""}/> </label>
</div>


<div className="col s2">
<a id="fingerInfo" 
 className="btn-floating btn-medium waves-effect waves-light #5e35b1 deep-purple darken-1" 
 onClick = {this.omFingerTriggerClick}
 >
<i class="material-icons">fingerprint</i></a>
</div>

<div className="col  s2">
<a id="userViolation" 
 className="btn-floating btn-medium waves-effect waves-light #5e35b1 deep-purple darken-1" 

 >
<i class="material-icons" onClick={this.onUserViolationClick}>error</i></a>


</div>
</div>

<UserViolationModal 
   modalInfo = {userViolationData}
   headers = {["Тип нарушения","Место","Дата","Время"]}
/>

{this.makeViolationUserModal()}


{/* МОДАЛЬНОЕ ОКНО */}
<FingerModal 
modalInfo = {modalInfo}

/>





                </div>
        <div class="card-action">
          <a href="#" onClick={this.onChangeUserDataButtonClick} className="changeButton" >Изменить</a>
          <a href="#" onClick={this.onDeleteUserDataButtonClick} className="rightButton"   >Удалить</a>
        </div>
      </div>
     
      {this.makeFingerModal()}
             
              </Fragment>);
          //ДОБАВЛЕНИЕ ОТДЕЛА-------------------------------------------------------------------------------
          case "addDept" :

          return (
               <Fragment>
     <div class="card ">
  
        <div class="card-content">

                <h6 class="cardCaption"> Отдел</h6>  
  <div class="row">
     <div className="col s6">
     <input type="text" placeholder="Название отдела"
      onInput={this.onValueInput.bind(this, 'deptName')}/>
     </div>
     <div className="col s6">
     <input type="text" placeholder="Уровень допуска"
      onInput={this.onValueInput.bind(this, 'deptAccessLevel')}
     />
     </div>
 

<div className="col s12">
      <button class="btn waves-effect waves-light #5e35b1 deep-purple darken-1 col s12" 
      type="submit" 
      name="action"
      onClick={this.onAddDeptButtonClick}
      >
      Добавить
      </button>
      
  </div>
  </div>

   <DeptTable 
   info={deptData}
   headers={["Отдел","Допуск",""]}
   />
 

            </div>
        {/* <div class="card-action">
         
        </div> */}
      </div>

               </Fragment>
          );
       //ПОИСК----------------------------------------------------------------------------------------------- 
          case "search" :

          return( <Fragment> 
                 <div class="card ">
        <div class="card-image">
    

        </div>
        <div class="card-content">

  {/* ПОИСК ----------------------------------------------------------------------------------------------------------*/}
      <h6 class="cardCaption">Поиск</h6> 
                          
    
    <SearchField 
     placeholderText="ID"
     checkboxText="ID"
     name='ID'
    />

   <SearchField 
     placeholderText="Фамилия"
     checkboxText="Фамилия"
     name='surname'
    />
    <SearchField 
     placeholderText="Имя"
     checkboxText="Имя"
     name="name"
    />

    <SearchField 
     placeholderText="Отчество"
     checkboxText="Отчество"
     name="farthername"
    />
    <SearchField 
     placeholderText="Специальность"
     checkboxText="Специальность"
     name="speciality"
    />
    <SearchField 
     placeholderText="Уровень доступа"
     checkboxText="Уровень доступа"
     name="accessLevel"
    />
<div class="row">

  <button class="btn waves-effect waves-light #5e35b1 deep-purple darken-1 col s12" 
type="submit"
 name="action"
 onClick = {this.onSearchButtonClick} >
 Поиск
  </button>
  </div>
     

<div className="row">
    
     
  </div>                
     

                </div>
        <div class="card-action">
            
        </div>
      </div>

          </Fragment>);

  //  ОТОБРАЖЕНИЕ ДОПУЩЕННЫХ СОТРУДНИКОВ
    case 'access':

       return (<Fragment>
        <div class="card ">
      <div class="card-image">
   

      </div>
      <div class="card-content">

              <h6 class="cardCaption">Допуск</h6>  
              <AccessTable 
               headers={["Пункт пропуска", "Дата","Время"]}
               mode="access"
               info={accessData}
               className = "accessTable"
               onTableClick = {this.onAccessTableClick}
               />

               <AccessModal 
               modalInfo = {accessCurrentData}
               />


      <DeletionAccess 
      calendarInit = {this.onAddItemChanges}
      periodEventName = "deletePeriodAccess"
      />
 
     
              </div>
              {this.makeAccessModal()}
      {/* <div class="card-action"> */}
  

        
      {/* </div> */}
    </div>
           
            </Fragment>);

   
        //  ОТОБРАЖЕНИЕ НАРУШЕНИЙ
    case 'violation':

        return (<Fragment>
         <div class="card ">
       <div class="card-image">
    
 
       </div>
       <div class="card-content">
 
               <h6 class="cardCaption"> Нарушение </h6>  
               
               <ViolationTable 
               headers={["Пункт пропуска", "Дата","Время"]}
               mode="violation"
               info={violationData}
               className = "violationTable"
               onTableClick = {this.onViolationTableClick}
               />

               <ViolationModal 
               modalInfo = {violationCurrentData}
               />
             
             <DeletionViolation 
      calendarInit = {this.onAddItemChanges}
      periodEventName = "deletePeriodViolation"
      />
 
               </div>
  
         {this.makeViolationModal()}
       
     </div>
            
             </Fragment>);
         
         default: 
         return null;
     }
  }

//навесить обработчик если выбран нужный элемент-иконка добавления
onAddItemChanges = () =>{
      //инициализируем переключатель дат и настраиваем календарь

setTimeout(()=>{
var datePick = document.querySelectorAll('.datepicker');
var instances = M.Datepicker.init(datePick,{
       format: 'dd.mm.yyyy',
       firstDay:1,
       yearRange:[1950,new Date().getFullYear()],
       i18n:{ //переводим календарь
         cancel:"Отмена",
         months:[
           'Январь',
           'Февраль',
           'Март',
           'Апрель',
           'Май',
           'Июнь',
           'Июль',
           'Август',
           'Сентябрь',
           'Октябрь',
           'Ноябрь',
           'Декабрь'
         ],
         monthsShort: [
           'Янв',
           'Фев',
           'Март',
           'Апр',
           'Май',
           'Июнь',
           'Июль',
           'Авг',
           'Сен',
           'Окт',
           'Ноя',
           'Дек'
         ],
         weekdays:
         [
           'Воскресенье',
           'Понедельник',
           'Вторник',
           'Среда',
           'Четверг',
           'Пятница',
           'Суббота'
         ],
         weekdaysShort:[
           'Вс',
           'Пн',
           'Вт',
           'Ср',
           'Чт',
           'Пт',
           'Сб'
         ],
         weekdaysAbbrev:	['Вс','Пн','Вт','Ср','Чт','Пт','Сб']

       }
     });
//    });
})
}

//на изменение пользовательских данных
onChangeUserDataButtonClick = ()=>{
 let {infoAccessLevel,infoDate,infoFarthername,infoSurname,infoName,infoSpeciality} = this.state;
 let confirmResult = confirm("Вы действительно хотите сохранить изменения?");
  if(!confirmResult) return;
 let currentUserId =  store.getState().currentUserData[0].id;

   

   socket.emit('changeUserData', {
     id: currentUserId,   
     name: infoName,
     surname: infoSurname,
     farthername: infoFarthername,
     date: infoDate,
     accessLevel: infoAccessLevel,
     speciality: infoSpeciality
   });

}

//удаление данных сотрудника
onDeleteUserDataButtonClick = () =>{
  let confirmResult = confirm("Вы действительно хотите удалить данные сотрудника?");
  if(!confirmResult) return;
   let currentUserId =  store.getState().currentUserData[0].id;

   socket.emit('deleteUserData', currentUserId);
}

//запускаем процедуру поиска
onSearchButtonClick = (e) =>{
  this.setState({
    filterParam: "",
    filterValue: ""
  });

  const {activePage} = this.props;

   let checkboxes =  e.target.closest('.card-content').querySelectorAll('input[checked]');
   if(!checkboxes||!checkboxes.length) return;

   //обьект с настройками поиска на отправку на сервер
   let sendObject = {};
      
   for(let i=0; i<checkboxes.length; i++){
      sendObject[checkboxes[i].getAttribute('name')] = checkboxes[i].closest('p').children[0].value;
   }

    
   socket.emit('searchInfo', {data:sendObject, page: activePage, fieldsPerPage : store.getState().fieldNumber });

}


// нажатие на таблицу проходов
onAccessTableClick = (e)=>{
   if(!e.target.tagName=="TD") return;

   let currentRow = e.target.parentElement;
   let data = {
       deptName : currentRow.children[0].innerHTML,
       date : currentRow.children[1].innerHTML,
       time : currentRow.children[2].innerHTML 
   };

   socket.emit('getCurrentAccessInfo', data);

  //  this.modalAccessController.open();
 

}

// нажатие на таблицу нарушений
onViolationTableClick = (e)=>{
  if(!e.target.tagName=="TD") return;
  // this.modalViolationController.open();


  let currentRow = e.target.parentElement;
  let data = {
      deptName : currentRow.children[0].innerHTML,
      date : currentRow.children[1].innerHTML,
      time : currentRow.children[2].innerHTML 
  };

  socket.emit('getCurrentViolationInfo', data);
}

componentDidMount(){
     //сделаем подсвеченным первый пункт при загрузке
     let imageElem = this.firstImage.current;
     imageElem.click();

     //подписка на изменение Redux store
     let unsubscribe = store.subscribe(()=>{
      let userData = store.getState().currentUserData[0];
                  this.setState({
                    personMode: store.getState().personMode
                  });

      
      if(!userData) return;
     
           this.setState({
             infoDate : userData.date,
             infoAccessLevel: userData.accessLevel,
             infoName: userData.name,
             infoSurname: userData.surname,
             infoFarthername: userData.farthername,
             infoSpeciality: userData.speciality,                 
           
           });

   });
   //данные отделов
   socket.on('$getDeptData', (data)=>{
        this.setState({
           deptData : data
        });
   });


   //получить информацию об отпечатке
  socket.on('$getFingerInfo', (data) =>{
    this.setState({
      modalInfo: data
    });

    this.modalController.open();
        
  });
    
   socket.on('$getAccess', (data)=>{
           this.setState({
             accessData : data
           });
   });

   socket.on('$getViolation', (data)=>{
           this.setState({
            violationData : data
          });
});

 //получить данные о текущем нарушении
  socket.on('$getCurrentViolationInfo', (data)=>{
     this.setState({
        violationCurrentData : data 
     });
     this.modalViolationController.open();
  });

   //получить данные о текущем доступе
   socket.on('$getCurrentAccessInfo', (data)=>{
    this.setState({
      accessCurrentData : data
    });
    this.modalAccessController.open();    
  });

  //получить список нарушений
   socket.on('$userViolations', (data)=>{
     this.setState({
       userViolationData : data
     });
        this.modalUserViolation.open();
   }); 

   //обновим нарушения
   socket.on("$updateViolations", ()=>{
       socket.emit('getViolation');
   });

      //обновим доступы
    socket.on("$updateAccess", ()=>{
        socket.emit('getAccess');
    });

    //обновим отделы
    socket.on("$updateDepts", ()=>{
      socket.emit('getDeptData');
  });
    //обновим пользователей
    socket.on("$updateUsers", ()=>{
      console.log("Событие инициировано");
      socket.emit('getUsers',{page:1, fieldsPerPage: store.getState().fieldNumber});
  });

  



}

    render(){
        const {personMode} = this.state;

    //cсылка на нарушения
    const {violationRef} = this.props;
 

        return(<Fragment>
       {/* <div class="row"> */}

                                                                                   
   <div class="col s1 imageMenu"> 
      
       <div> <i class="medium material-icons menuIcon" ref={this.firstImage} onClick={this.onAccountIconClick}>account_circle</i> </div>
       <div> <i class="medium material-icons menuIcon" onClick={this.onAddUserIconClick}>add_circle</i> </div>
       {/* <div> <i class="medium material-icons menuIcon" >fingerprint</i> </div> */}
       <div> <i class="medium material-icons menuIcon" onClick={this.onSearchIconClick}> search</i> </div>
       <div> <i class="medium material-icons menuIcon" onClick={this.onAddDeptIconClick}>business_center</i> </div>
       {/* <div> <i class="medium material-icons menuIcon" > fingerprint </i> </div> */}
       <div> <i class="medium material-icons menuIcon" onClick={this.onAccessIconClick} >assignment</i> </div>
       <div> <i class="medium material-icons menuIcon" ref={violationRef} onClick={this.onViolationIconClick} >error</i> </div>
    </div> 


    <div class="col s4 ">
           {this.cardContent(personMode)}
    </div>
  {/* </div> */}
        </Fragment>)
    }
}


//изменить иконку меню
function changeMenuItem(e , modeName){
  removeHighlight();
  e.target.classList.add('choosedIcon');
   store.dispatch(setPersonMode(modeName));
}








//убирает выделение со всех элементов-иконок в меню
function removeHighlight(){
  ([].slice.apply(document.querySelectorAll('.menuIcon'))).map((item)=>{
     if(!item.classList.contains('choosedIcon')) return;
            item.classList.remove('choosedIcon');
  });
}



export default PersonInfo;