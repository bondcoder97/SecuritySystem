import React, {Component,Fragment} from 'react';

class Header extends Component{
   constructor(props){
         super(props);
   }

   render(){
      const {deptName, renderFlasher, alarm} = this.props;
      return  ( <Fragment> 
               
    {/* <!-- NAVBAR --> */}
    <nav>
        <div class="nav-wrapper #4527a0 deep-purple darken-3">
        
          <a href="#" class="brand-logo">Барьер </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          {renderFlasher&&alarm ? renderFlasher():null}
            <li><a href="">{deptName}</a></li>
         

       
          </ul>
        </div>
      </nav>
     {/* <!-- NAVBAR : END --> */}
          </Fragment>);
   }

}


export default Header;