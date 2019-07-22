import React, {Component,Fragment} from 'react';
import {store} from '../../public/store';
import {setFieldNumber} from '../../public/actions';

class Pagination extends Component{
    constructor(props){
       super(props);
       this.state = {
      
       }
 
    }
    //нажатие на номер страницы
    onPageNumberClick = (e) =>{
         const {fieldNumber} = store.getState();
         let currentPage = e.target.innerHTML;
         changePage(currentPage, fieldNumber);
    }
    //нажатие на стрелочку на страницах
    onArrowClick = (side)=>{
          const {fieldNumber} = store.getState();
          const {activePage,availablePages} = this.props;

        switch(side)
        {
            case "left":
                //дальше некуда, самая первая страница
            if(activePage == availablePages[0]) return;
            changePage(activePage-1,fieldNumber);

            break;
            case "right":

                 //дальше некуда, самая последняя страница
            if(activePage == availablePages[availablePages.length-1]) return;
            changePage(activePage+1,fieldNumber);

            break;
        }

    }
 
    //на изменение числа записей
    onFieldNumberChange = ({target:{value}})=>{
         store.dispatch(setFieldNumber(value));
        //  store.subscribe(()=>{
        //           this.setState({
        //             fieldNumber: value
        //           });
        //     });
       
         socket.emit('getUsers', {page: 1, fieldsPerPage: value});
    }
 
    render(){
    const {fieldNumber} = store.getState();
    const {availablePages,activePage} = this.props;
 
       return (<Fragment>
         <div class="row">

<ul class="pagination col offset-s7">
     < li><a href="#!"  className="waves-effect" onClick={this.onArrowClick.bind(this,'left')}><i class="material-icons">chevron_left</i></a></li>
             
              {/* генерация страниц */}
             {availablePages&&availablePages.length ? availablePages.map((item)=>{
             let nameOfClass="waves-effect ";
 
             if(activePage==item)
             nameOfClass+=' active '; 
   
     return ( <li className={nameOfClass} key={item} onClick={this.onPageNumberClick}><a href="#!">{item}</a></li> );
   
   }) :   <li class="waves-effect"><a href="#!">1</a></li>}
     
     
 
      
     <li className="waves-effect" onClick={this.onArrowClick.bind(this,'right')}><a href="#!"><i class="material-icons">chevron_right</i></a></li>
   </ul>
 
 <div className="col s2">
   <select value={fieldNumber} onChange={this.onFieldNumberChange} >
          <option key="15" value="15"> 15 записей </option>
          <option key="20" value="20"> 20 записей </option>
          <option key="25" value="25"> 25 записей </option>
          <option key="30" value="30"> 30 записей </option>
          
   </select>
   </div>
 
   </div>
 
 
       </Fragment>);
    }
 
 }

//поменять страницу
 function changePage(page, fieldsPerPage){
     //режим
     let mode = store.getState().personMode; 
     let serverEvent = "";
    

     switch(mode){
        case "search" :

        let checkboxes =  document.querySelector('.card-content').querySelectorAll('input[checked]');
        
        if(!checkboxes||!checkboxes.length) return;
     
        //обьект с настройками поиска на отправку на сервер
        let sendObject = {};
           
        for(let i=0; i<checkboxes.length; i++){
           sendObject[checkboxes[i].getAttribute('name').toLowerCase()] = checkboxes[i].closest('p').children[0].value;
        }

         socket.emit('searchInfo',{data:sendObject, page: +page, fieldsPerPage});
        break;

        default:
        socket.emit('getUsers', {page,fieldsPerPage})
     }

      
 }

 export default Pagination;