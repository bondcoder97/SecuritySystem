//вывод уведомления
//первый параметр - текст сообщения, второй - класс для задания внешнего вида и третий это время до исчезновения
(function() {
function message(text,  elemClass='#8bc34a light-green', time=1500) {
    let elem = document.createElement('div');
    elem.className = `${elemClass}`;
    elem.setAttribute('role','alert');
    elem.textContent = text;
    elem.insertAdjacentHTML('beforeEnd', `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>`); 
  elem.style.position = "fixed";
  elem.style.top = '40%';
  elem.style.left='30%';
  elem.style.minWidth =  "40%";
  elem.style.minHeight = '10%';
  elem.style.fontWeight = 'bold';
  elem.style.fontSize = '1.8rem';
  elem.style.paddingLeft = '9%';
    document.body.appendChild(elem);

    if(time){
        setTimeout(function() {
         $('.alert').fadeOut(1000); 
           }, time)
     }

 }

function createMessage(text,status,time=1500){
  if(status=="error"){
    message(text, "#e53935 red darken-1" );
    return;
  }

  message(text,  status, time );

}

window.createMessage = createMessage;

// window.message = message;

})();