import React, {Component,Fragment} from 'react';




//модальное окно для отпечатков пользователя
class FingerModal extends Component{
    constructor(props){
          super(props);
          this.state = {
              pin : '',
              // imgURL : '' //URL обьект
          }
    }
 
    //на ввод пин-кода
    onPinInput = ({target:{value}}) =>{
          this.setState({
            pin : value
          });
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
   
   //нажатие на иконку обновления
   onUpdateIconClick = ()=>{

    let accept = confirm("Вы действительно хотите обновить снимок?");
    if(!accept) return;

    let {modalInfo} = this.props;
    let {id} = modalInfo;
 
 let {pin} = this.state;
       
 let fileReader = new FileReader();
 
 //прикрепленное изображение
   let myFile = document.querySelector('#updateFinger');
    let blob = new Blob([myFile.files[0]], {type:'img/png'});
 

 
 fileReader.readAsArrayBuffer(blob);
 
 fileReader.onload = function(event) {
   let finger = fileReader.result;
   
       //если поля не заполнены
       if( !pin ) return;
 
       console.log(id);
       socket.emit('updateFingerprint', {pin, finger,id});
 
 
   }
 
 }

//  получение снимка с сервера
 onGetFinger = () =>{
  let {modalInfo} = this.props;
  let {finger} = modalInfo;
  console.log(finger);

 
  let blob = new Blob([finger], {type:'img/png'});
  document.querySelector('#updateFingerImg').src = URL.createObjectURL(blob);

  URL.revokeObjectURL(blob);

 }

 componentDidUpdate(){
     this.onGetFinger();
 }

    render(){
        let {modalInfo} = this.props;
        let {name,surname, farthername, id,finger} = modalInfo;

        const {pin} = this.state;
 
        return(
               <Fragment>
                      <div id="fingerModal" class="modal">
               <div class="modal-content">
                <h5 className="modal-title">{`${surname} ${name} ${farthername} (id: ${id})`}</h5>
            
            
           <div className="row"> 
         <div className="col s5">
         <img src="" 
         width="200px" 
         height="200px" 
         alt="user fingerprint"
          id="updateFingerImg" 
          className="finger"/>
 
         </div>
 
    
         <div className="col s7">
 
 
         <input type="text"
          value={pin}
          placeholder="ПИН-код" 
          onInput = {this.onPinInput}
          />
 
        <label id="finger">
 
         <span class="btn #5e35b1 deep-purple darken-1" 
         id="updateFingerFile"
         > Выберите файл </span> 
           <input type="file" id="updateFinger"  onChange={this.onImageFileChange}/> 
         </label>
    
         <div> <i class="large material-icons"
          title="Обновить снимок"
           id="updateFingerButton" 
           onClick={this.onUpdateIconClick}
           >update</i> </div>
 
 
 
         </div>
     </div>
 
 </div>
 
   
  
 
 
               <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Закрыть</a>
     </div>
   </div>
               </Fragment>
        );
    }
 
 }

 export default FingerModal;


 