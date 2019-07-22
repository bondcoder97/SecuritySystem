//добавить текущие данные пользователя
export function addCurrentUserData(data){
  return  ({type:'SET_CURRENT_USER_DATA', currentUserData: data});
}
//установим отображаемое после нажатия иконки меню(иконки)
export function setPersonMode(mode){
    return ({type:"SET_PERSON_MODE", mode});
}

export function setFieldNumber(fieldNumber){
  return ({type:"SET_FIELD_NUMBER", fieldNumber});
}