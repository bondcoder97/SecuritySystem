import {createStore} from 'redux';
import reducer from '../reducers/index';
//начальное состояние
const initialState = {currentUserData: '',personMode:'userInfo',fieldNumber:15};

export const store = createStore(reducer,initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    //включим инструменты разработчика