import React, {Component,Fragment} from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import ReactDOM from 'react-dom';
import SimulForm from './simulForm';






class App extends Component{
    constructor(props){
       super(props);

    }


    render(){

         return (
            <Fragment>
              <Header 
                       deptName="Отдел упаковки"
              />
              <main>
                 <div className="gridContainer #9fa8da indigo lighten-3">
                   <SimulForm  className="simulForm"/>
                 
                  </div>
               </main>
              <Footer />
            </Fragment>
         );
    }
}







ReactDOM.render(<App />, document.querySelector('body'));