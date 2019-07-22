export default function(state,action){
    switch(action.type){
     //данные текущего пользователя
     case "SET_CURRENT_USER_DATA":
       return ({
        ...state,
        currentUserData: action.currentUserData
     }); 
     //изменяем режим при клике на иконку меню
     case 'SET_PERSON_MODE':
       return ({
           ...state, personMode: action.mode
       });
      //установить количество записей
      case 'SET_FIELD_NUMBER':

      return ({
          ...state, fieldNumber: action.fieldNumber
      });
      
     default:
     return state;

    }
}