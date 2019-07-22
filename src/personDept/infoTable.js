import React, {Component,Fragment} from 'react';
import { store } from '../../public/store';
import {addCurrentUserData,setPersonMode} from '../../public/actions';

//табоица с информацией
class InfoTable extends Component{
    constructor(props){
        super(props);
         
        //ссылка для делегирования на таблице
        this.currentTable = React.createRef();
    }   
  
   componentDidMount(){
        this.currentTable.current.addEventListener('click', (e)=>{
            
          
            //нажал на заголовки, а не на строки таблицы
            if( e.target.closest('th')) return; 
            //текущая строка
            let currentRow = e.target.closest('tr');
            socket.emit('getDetailUserInfo', {id: currentRow.children[0].innerHTML});
            
        }); 

          //получение данных конкретного пользователя
          socket.on('$getDetailUserInfo', (data)=>{
              

              store.dispatch(addCurrentUserData(data));
            //  let unsubscribe = store.subscribe(()=>{console.log(store.getState())});
             if(store.getState().personMode!='userInfo')
             document.querySelector('.imageMenu').children[0].children[0].click();
          });

      
         
   }
  
   
    render(){
        const {headers, info}  = this.props;
  
        return (<Fragment>
          
            <table ref={this.currentTable} className="highlight col s5 offset-s1">
                  <thead>
                    <tr>
                    {headers&&headers.length?
                     headers.map((item)=>{
                          return (<th key={item}>{item} </th>)
                    }):null}
                    </tr>
                  </thead>
          
                   <tbody>
                  
                  {info&&info.length?
                  info.map((item)=>{
                    
                    return (<tr key={item.id}> <td>{item.id}</td>  <td>{item.surname}</td>
         <td>{item.name}</td><td>{item.farthername}</td>  <td>{item.speciality}</td>   </tr>)
                    }):null}
                  </tbody>
             </table>

  
        </Fragment>);
    }
  
  }


  export default InfoTable;