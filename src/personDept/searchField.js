import React, {Component,Fragment} from 'react';
//поисковый элемент
class SearchField extends Component{

    constructor(props){
       super(props);
       this.state = {
         isChecked: false // выбран ли checkbox
       }
    }
   //изменение checkbox
   onCheckboxChange = () =>{
     const {isChecked} = this.state; 
     this.setState({
      isChecked: !isChecked
   })
  }
  
    render(){
      const {placeholderText, checkboxText,name} = this.props;
      const {isChecked} = this.state;
  
    return(
      <Fragment>
       <p>
       {isChecked?
          <input class="searchCheck" type="text" placeholder={placeholderText}/> : null
          }
        <label>
          <input type="checkbox" name={name} onChange={this.onCheckboxChange} defaultChecked={isChecked}/>
          <span> {checkboxText}</span>
        </label>
      </p>
      </Fragment>
    );
    }
  }

  export default SearchField;