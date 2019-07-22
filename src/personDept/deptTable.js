import React, {Component,Fragment} from 'react';
//таблица отделов
class DeptTable extends Component{
    constructor(props){
       super(props);
    }

    //нажатие на корзину (удаление)
    onTrashIconClick = (e) => {
       let confirmResult = confirm('Вы действительно хотите удалить этот отдел?');
       if(!confirmResult) return;
        let currentRow = e.target.closest('tr');

        currentRow.style.display = "none";

       socket.emit('deleteDept', currentRow.children[0].innerHTML );
       
       
    }
   //нажатие на иконку карандаша (изменение)
    onEditIconClick = (e) => {
      let confirmResult = confirm('Вы действительно хотите изменить данные этого отдела?');
      if(!confirmResult) return;
      let currentRow = e.target.closest('tr');

       socket.emit('editDept', {deptName:currentRow.children[0].innerHTML, 
         accessLevel:currentRow.children[1].innerHTML,
          oldDeptName: currentRow.children[0].getAttribute('name')
      });

    }         

    componentDidMount(){
 //получить данные всех существующих отделов
      socket.emit('getDeptData');
 
    }
  
    render(){
      let {headers,info} = this.props;
  
    
          return (
            <React.Fragment>
      <div className="tableContainer row">        
               <table className="highlight">
      <thead>
        <tr>
                    {headers&&headers.length?
                       headers.map((item)=>{
                            return (<th key={item}>{item} </th>)
                      }):null}
                      </tr>
         </thead>
      <tbody className="depts">
  
      {info&&info.length?
                    info.map((item)=>{
                      
                      return (<tr key={item.deptName}>
                  <td contentEditable="true" name={item.deptName}>{item.deptName}</td>
                  <td contentEditable="true">{item.accessLevel}</td> 
    <td>
    <i class="tiny material-icons" onClick={this.onEditIconClick} > create</i> 
    <i class="tiny material-icons" onClick={this.onTrashIconClick}> delete</i> 
    </td>
                      </tr>)
                      }):null}
  
          </tbody>
      </table>
      </div>
               </React.Fragment>
          );
    }
  }

  export default DeptTable;