import React, {Component,Fragment} from 'react';


class SimulForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            pin : ""
        }

    }

    //ввод ПИН-кода
    onPinInput = ({target:{value}})=>{
          this.setState({
              pin : value
          });
    }

    //на изменение отпечатка в симуляции
    onImageFileChange = (e) =>{
          //картинка отпечатка
    let finger = e.target.closest(".row").querySelector('img');
  
    //отображаем выбранный отпечаток
    let blob = new Blob([e.target.files[0]], {type:"img/png"});

    let urlValue = URL.createObjectURL(blob);

    finger.src = urlValue;
    URL.revokeObjectURL(blob);
    }



    //нажатие на кнопку входа в систему
onLoginButtonClick = () =>{
    const {pin} = this.state;
      
        let fileReader = new FileReader();

        //прикрепленное изображение
  let myFile = document.querySelector('#updateFinger');
   let blob = new Blob([myFile.files[0]], {type:'img/png'});


fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {
  let finger = fileReader.result;  
   
  if(!pin) return;

  socket.emit('deptLogin', {pin, finger, deptName : "Отдел упаковки"});

}

}

    render(){
        const {pin} = this.state;

        return (<Fragment>
                 <div className="simulForm #303f9f indigo darken-2"> 
                          <h5> Система контроля доступа "Барьер" </h5>
                          
  
  <div className="row"> 
         <div className="col s5">
         <img
          src="./fingerprint.jpg" 
         width="200px" 
         height="200px" 
         alt="user fingerprint"
         id="fingerImg"
          className="finger"/>
        
 
         </div>
 
    
         <div className="col s7">
 
 
         <input type="text" 
         placeholder="ПИН-код"
         value={pin}
         onInput = {this.onPinInput} 
        />
 
        <label id="finger">
 
         <span class="btn #5e35b1 deep-purple darken-1" 
      
         > Выберите файл </span> 
           <input type="file" id="updateFinger"  onChange={this.onImageFileChange}/> 
         </label>
    
      
 
 
 
         </div>
     </div>
  
                            <div className = "row">
                            <a class="waves-effect waves-light btn col s5 offset-s3"
                             onClick = {this.onLoginButtonClick}
                            >Войти</a>
                            </div>

                       
                        </div>


        </Fragment>
            );
    }
}


export default SimulForm;