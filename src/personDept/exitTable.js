import React, {Component,Fragment} from 'react';



//таблица для нарушений и пропусков
class ExitTable extends Component{
    constructor(props){
      super(props);

 
         
    }

    componentDidMount(){
        const {mode} = this.props;
        switch(mode){
          case "violation" :
            socket.emit('getViolation');
          break;
          case "access":
            socket.emit('getAccess');
          break;
        }

    }


    

    render(){
      let {headers,info, onTableClick} = this.props;
  
      return (<Fragment>
           
  <div className="tableContainer row">        
         <table className="highlight" onClick={onTableClick}>
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
            <td>{item.deptName}</td>
            <td>{item.date}</td> 
            <td>{item.time}</td> 

                </tr>)
                }):null}
  
    </tbody>
  </table>
  </div>
      </Fragment>);
    }
  }

  export default ExitTable;