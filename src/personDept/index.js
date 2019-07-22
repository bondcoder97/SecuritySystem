import React, {Component,Fragment} from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import PersonInfo from './personInfo';
import InfoTable from './infoTable';
import Pagination from './pagination';
import ReactDOM from 'react-dom';

import {store} from '../../public/store/index';




class App extends Component{
    constructor(props){
       super(props);
      //  this.personData = {}; //данные для занесения в таблицу
       this.state = {
         personData : {}, //пользователи,
         availablePages: [],
         activePage: 1,
         alarm : false //тревога
        }
        //иконка с ссылкой
        this.violationRef = React.createRef();
    }

    //нажатие на мигалку
    onFlasherClick = () =>{
        this.violationRef.current.click();
        this.setState({
          alarm : false
        });
    }

    //выключить мигалку
    switchOffFlasher= () =>{
        this.setState({
          alarm : false
        });
    }

   //отрисовать мигалку
    renderFlasher = () => {
      return (
      <li>
         <img  src="migalka.gif" 
      onClick = {this.onFlasherClick} 
      className="flasher" width="50px" 
      height="50px"
      />      
       </li>);
    }
    

  componentDidMount(){
    socket.emit('getUsers', {page:1, fieldsPerPage:15});
   
     //получим данные о пользователях
     socket.on('$getUsers', (info)=>{
      let {data,availablePages,page} = info;
      this.setState({
          personData: data,
          availablePages: availablePages,
          activePage: page
      });


    });

      //отловим результаты поиска  
      socket.on('$searchInfo', (info)=>{
        
        let {data,availablePages,page} = info;
      
            this.setState({
               personData: data,
               availablePages : availablePages, 
               activePage: page
            });
      });

      //на тревогу
       socket.on('$alarm', ()=>{
        let currentMode = store.getState().personMode;
           //если на вкладке нарушений, то не показывать мигалку
            if(currentMode=="violation") return;
            this.setState({
                 alarm: true
            });
       });

  
  }



    render(){
      const {personData,availablePages,activePage,alarm} = this.state;
      // let currentMode = store.getState().personMode;
      // console.log(currentMode);
         return (
            <Fragment>
              <Header
              deptName="Отдел безопасности"
              renderFlasher = {this.renderFlasher}
              alarm = {alarm}
              />
              <main>
              <div class="row">
               <PersonInfo 
                activePage = {activePage}
                violationRef = {this.violationRef}
                switchOffFlasher ={this.switchOffFlasher}
               />
               <InfoTable 
               headers = {["ID","Фамилия","Имя","Отчество","Специальность" ]}
               info = {personData}
               />
               </div>
              <Pagination 
               availablePages={availablePages}
               activePage = {activePage}
              />
               </main>
              <Footer />
            </Fragment>
         );
    }
}







ReactDOM.render(<App />, document.querySelector('body'));






