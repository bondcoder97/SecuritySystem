import React, {Component,Fragment} from 'react';

//удаление пропускной информации за период
class DeletingExit extends Component{
    constructor(props){
         super(props);
         this.state = {
           startTime : "",
           endTime : ""
         }
    }

      //ввод значения в INPUT
   onValueInput = (property,{target:{value}})=>{
     this.setState({
          [`${property}`]: value
     });
  }

  //удалить за период
  onPeriodDelete = (e)=>{
   let {periodEventName} = this.props;
   let {startTime, endTime} = this.state;

    let deleteInputs = document.querySelectorAll('.deletingExit input[type=text]'); //ввод для удаления
    
    if(!startTime||!endTime||!deleteInputs[0].value||!deleteInputs[2].value) return; 
  
    socket.emit(periodEventName,{startTime, endTime, startDate: deleteInputs[0].value, endDate: deleteInputs[2].value});
    
  }
      
    render(){
     //инициализировать клендарь и отправить событие с данными
     let {calendarInit} = this.props;

     let {startTime, endTime} = this.state;
   
     // periodEventName = "deletePeriodAccess"
         return (<Fragment>

                               
       <div className="row deletingExit">
       <label className="col s3"> Исходная дата
       <input type="text" class="datepicker"  />
       </label>

       <label className="col s3"> Исходное время
       <input type="text"  onInput={this.onValueInput.bind(this,"startTime")} value={startTime}/>
       </label>

       <label className="col s3"> Конечная дата
       <input type="text" class="datepicker"/>
       </label>

       <label className="col s3"> Конечное время
       <input type="text"  onInput={this.onValueInput.bind(this,"endTime")} value={endTime} />
       </label>
       </div>
       

     <a href="#" className="btn col offset-s3 #5e35b1 deep-purple darken-1" onClick={this.onPeriodDelete}>Удалить за период</a> 

     {calendarInit()}

         </Fragment>);
    }
}

export default DeletingExit;