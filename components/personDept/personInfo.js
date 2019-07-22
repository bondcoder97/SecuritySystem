var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import { store } from '../../public/store/index';
import { setPersonMode } from '../../public/actions';
import SearchField from './searchField';
import DeptTable from './deptTable';
import FingerModal from './fingerModal';
import ExitTable from './exitTable';
import DeletingExit from './deletingExit';

//модалка пользовательского нарушения

var UserViolationModal = function (_Component) {
  _inherits(UserViolationModal, _Component);

  function UserViolationModal(props) {
    _classCallCheck(this, UserViolationModal);

    return _possibleConstructorReturn(this, (UserViolationModal.__proto__ || Object.getPrototypeOf(UserViolationModal)).call(this, props));
  }

  _createClass(UserViolationModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          modalInfo = _props.modalInfo,
          headers = _props.headers;

      var info = modalInfo;
      console.log(info);
      var name = void 0,
          surname = void 0,
          farthername = void 0,
          id = void 0;

      if (store.getState().currentUserData[0]) {
        ;

        var _store$getState$curre = store.getState().currentUserData[0];
        name = _store$getState$curre.name;
        surname = _store$getState$curre.surname;
        farthername = _store$getState$curre.farthername;
        id = _store$getState$curre.id;
      }return React.createElement(
        Fragment,
        null,
        React.createElement(
          'div',
          { id: 'userViolationModal', 'class': 'modal' },
          React.createElement(
            'div',
            { 'class': 'modal-content' },
            name && surname && farthername && id ? React.createElement(
              'h5',
              { className: 'modal-title' },
              surname + ' ' + name + ' ' + farthername + ' (id: ' + id + ')'
            ) : null
          ),
          info.length ? React.createElement(
            'table',
            { className: 'highlight' },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                headers && headers.length ? headers.map(function (item) {
                  return React.createElement(
                    'th',
                    { key: item },
                    item,
                    ' '
                  );
                }) : null
              )
            ),
            React.createElement(
              'tbody',
              { className: 'exit' },
              info && info.length ? info.map(function (item) {

                return React.createElement(
                  'tr',
                  { key: item.deptName },
                  React.createElement(
                    'td',
                    null,
                    item.type
                  ),
                  React.createElement(
                    'td',
                    null,
                    item.dept
                  ),
                  React.createElement(
                    'td',
                    null,
                    item.date
                  ),
                  React.createElement(
                    'td',
                    null,
                    item.time
                  )
                );
              }) : null
            )
          ) : React.createElement(
            'h4',
            { className: 'violationMessage', violationMessage: true },
            ' \u041D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0439 \u043D\u0435 \u0438\u043C\u0435\u0435\u0442\u0441\u044F!'
          ),
          React.createElement(
            'div',
            { 'class': 'modal-footer' },
            React.createElement(
              'a',
              { href: '#!', 'class': 'modal-close waves-effect waves-green btn-flat' },
              '\u0417\u0430\u043A\u0440\u044B\u0442\u044C'
            )
          )
        )
      );
    }
  }]);

  return UserViolationModal;
}(Component);

//сделаем 2 наследника для полной замены компонента


var DeletionViolation = function (_DeletingExit) {
  _inherits(DeletionViolation, _DeletingExit);

  function DeletionViolation(props) {
    _classCallCheck(this, DeletionViolation);

    return _possibleConstructorReturn(this, (DeletionViolation.__proto__ || Object.getPrototypeOf(DeletionViolation)).call(this, props));
  }

  return DeletionViolation;
}(DeletingExit);
//сделаем 2 наследника для полной замены компонента


var DeletionAccess = function (_DeletingExit2) {
  _inherits(DeletionAccess, _DeletingExit2);

  function DeletionAccess(props) {
    _classCallCheck(this, DeletionAccess);

    return _possibleConstructorReturn(this, (DeletionAccess.__proto__ || Object.getPrototypeOf(DeletionAccess)).call(this, props));
  }

  return DeletionAccess;
}(DeletingExit);

//модальное окно доступов


var AccessModal = function (_Component2) {
  _inherits(AccessModal, _Component2);

  function AccessModal(props) {
    _classCallCheck(this, AccessModal);

    return _possibleConstructorReturn(this, (AccessModal.__proto__ || Object.getPrototypeOf(AccessModal)).call(this, props));
  }

  _createClass(AccessModal, [{
    key: 'render',
    value: function render() {
      var modalInfo = this.props.modalInfo;
      var name = modalInfo.name,
          surname = modalInfo.surname,
          farthername = modalInfo.farthername,
          deptName = modalInfo.deptName,
          speciality = modalInfo.speciality,
          date = modalInfo.date,
          time = modalInfo.time,
          id = modalInfo.id,
          accessLevel = modalInfo.accessLevel;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          'div',
          { id: 'accessModal', 'class': 'modal' },
          React.createElement(
            'div',
            { 'class': 'modal-content' },
            React.createElement(
              'h5',
              { className: 'modal-title' },
              surname + ' ' + name + ' ' + farthername + ' (id: ' + id + ')'
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'label',
                { className: 'col s6' },
                ' \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
                React.createElement('input', { type: 'text', readOnly: true, value: speciality })
              ),
              React.createElement(
                'label',
                { className: 'col s6' },
                ' \u041F\u0440\u043E\u043F\u0443\u0441\u043A\u043D\u043E\u0439 \u043F\u0443\u043D\u043A\u0442',
                React.createElement('input', { type: 'text', readOnly: true, value: deptName })
              ),
              React.createElement(
                'label',
                { className: 'col s5' },
                ' \u0414\u0430\u0442\u0430',
                React.createElement('input', { type: 'text', readOnly: true, value: date })
              ),
              React.createElement(
                'label',
                { className: 'col s4' },
                ' \u0412\u0440\u0435\u043C\u044F',
                React.createElement('input', { type: 'text', readOnly: true, value: time })
              ),
              React.createElement(
                'label',
                { className: 'col s3' },
                ' \u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430',
                React.createElement('input', { type: 'text', readOnly: true, value: accessLevel })
              )
            )
          ),
          React.createElement(
            'div',
            { 'class': 'modal-footer' },
            React.createElement(
              'a',
              { href: '#!', 'class': 'modal-close waves-effect waves-green btn-flat' },
              '\u0417\u0430\u043A\u0440\u044B\u0442\u044C'
            )
          )
        )
      );
    }
  }]);

  return AccessModal;
}(Component);

//модальное окно нарушений


var ViolationModal = function (_Component3) {
  _inherits(ViolationModal, _Component3);

  function ViolationModal(props) {
    _classCallCheck(this, ViolationModal);

    return _possibleConstructorReturn(this, (ViolationModal.__proto__ || Object.getPrototypeOf(ViolationModal)).call(this, props));
  }

  _createClass(ViolationModal, [{
    key: 'render',
    value: function render() {
      var modalInfo = this.props.modalInfo;
      var name = modalInfo.name,
          surname = modalInfo.surname,
          farthername = modalInfo.farthername,
          dept = modalInfo.dept,
          speciality = modalInfo.speciality,
          date = modalInfo.date,
          time = modalInfo.time,
          id = modalInfo.id,
          accessLevel = modalInfo.accessLevel,
          type = modalInfo.type;

      return React.createElement(
        Fragment,
        null,
        React.createElement(
          'div',
          { id: 'violationModal', 'class': 'modal' },
          React.createElement(
            'div',
            { 'class': 'modal-content' },
            React.createElement(
              'h5',
              { className: 'modal-title' },
              '' + type
            ),
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'label',
                { className: 'col s4' },
                ' \u0424\u0430\u043C\u0438\u043B\u0438\u044F',
                React.createElement('input', { type: 'text', readOnly: true, value: surname })
              ),
              React.createElement(
                'label',
                { className: 'col s4' },
                ' \u0418\u043C\u044F',
                React.createElement('input', { type: 'text', readOnly: true, value: name })
              ),
              React.createElement(
                'label',
                { className: 'col s4' },
                ' \u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E',
                React.createElement('input', { type: 'text', readOnly: true, value: farthername })
              ),
              React.createElement(
                'label',
                { className: 'col s2' },
                ' id',
                React.createElement('input', { type: 'text', readOnly: true, value: id })
              ),
              React.createElement(
                'label',
                { className: 'col s5' },
                ' \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
                React.createElement('input', { type: 'text', readOnly: true, value: speciality })
              ),
              React.createElement(
                'label',
                { className: 'col s5' },
                ' \u041F\u0440\u043E\u043F\u0443\u0441\u043A\u043D\u043E\u0439 \u043F\u0443\u043D\u043A\u0442',
                React.createElement('input', { type: 'text', readOnly: true, value: dept })
              ),
              React.createElement(
                'label',
                { className: 'col s5' },
                ' \u0414\u0430\u0442\u0430',
                React.createElement('input', { type: 'text', readOnly: true, value: date })
              ),
              React.createElement(
                'label',
                { className: 'col s4' },
                ' \u0412\u0440\u0435\u043C\u044F',
                React.createElement('input', { type: 'text', readOnly: true, value: time })
              ),
              React.createElement(
                'label',
                { className: 'col s3' },
                ' \u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430',
                React.createElement('input', { type: 'text', readOnly: true, value: accessLevel })
              )
            )
          ),
          React.createElement(
            'div',
            { 'class': 'modal-footer' },
            React.createElement(
              'a',
              { href: '#!', 'class': 'modal-close waves-effect waves-green btn-flat' },
              '\u0417\u0430\u043A\u0440\u044B\u0442\u044C'
            )
          )
        )
      );
    }
  }]);

  return ViolationModal;
}(Component);

//сделаем для перерисовки


var ViolationTable = function (_ExitTable) {
  _inherits(ViolationTable, _ExitTable);

  function ViolationTable(props) {
    _classCallCheck(this, ViolationTable);

    return _possibleConstructorReturn(this, (ViolationTable.__proto__ || Object.getPrototypeOf(ViolationTable)).call(this, props));
  }

  return ViolationTable;
}(ExitTable);

var AccessTable = function (_ExitTable2) {
  _inherits(AccessTable, _ExitTable2);

  function AccessTable(props) {
    _classCallCheck(this, AccessTable);

    return _possibleConstructorReturn(this, (AccessTable.__proto__ || Object.getPrototypeOf(AccessTable)).call(this, props));
  }

  return AccessTable;
}(ExitTable);

//отображение информации конкретного пользователя


var PersonInfo = function (_Component4) {
  _inherits(PersonInfo, _Component4);

  function PersonInfo(props) {
    _classCallCheck(this, PersonInfo);

    var _this8 = _possibleConstructorReturn(this, (PersonInfo.__proto__ || Object.getPrototypeOf(PersonInfo)).call(this, props));

    _this8.onValueInput = function (property, _ref) {
      var value = _ref.target.value;

      _this8.setState(_defineProperty({}, '' + property, value));
    };

    _this8.onAccountIconClick = function (e) {
      changeMenuItem(e, 'userInfo');
    };

    _this8.onAddUserIconClick = function (e) {

      changeMenuItem(e, 'addUser');
      _this8.onAddItemChanges();
    };

    _this8.onAddDeptIconClick = function (e) {

      changeMenuItem(e, 'addDept');
    };

    _this8.onSearchIconClick = function (e) {
      changeMenuItem(e, 'search');
    };

    _this8.onAccessIconClick = function (e) {
      changeMenuItem(e, 'access');
    };

    _this8.onViolationIconClick = function (e) {
      var switchOffFlasher = _this8.props.switchOffFlasher;


      changeMenuItem(e, 'violation');
      switchOffFlasher();
    };

    _this8.onAddDeptButtonClick = function () {
      var _this8$state = _this8.state,
          deptName = _this8$state.deptName,
          deptAccessLevel = _this8$state.deptAccessLevel;

      //не заполнены

      if (!deptName || !deptAccessLevel) return;

      socket.emit('addDept', { deptName: deptName, deptAccessLevel: deptAccessLevel });
    };

    _this8.onAddUserButtonClick = function (e) {

      var date = document.querySelector('.datepicker').value;

      var _this8$state2 = _this8.state,
          name = _this8$state2.name,
          surname = _this8$state2.surname,
          farthername = _this8$state2.farthername,
          speciality = _this8$state2.speciality,
          accessLevel = _this8$state2.accessLevel,
          pin = _this8$state2.pin;


      var fileReader = new FileReader();

      //прикрепленное изображение
      var myFile = document.querySelector('#myFile');
      var blob = new Blob([myFile.files[0]], { type: 'img/png' });

      fileReader.readAsArrayBuffer(blob);

      fileReader.onload = function (event) {
        var finger = fileReader.result;

        //если поля не заполнены
        if (!(name && surname && farthername && date && speciality && accessLevel && pin)) return;

        socket.emit('addUser', { name: name, surname: surname, farthername: farthername, date: date, speciality: speciality, accessLevel: accessLevel, pin: pin, finger: finger });
      };
    };

    _this8.onImageFileChange = function (e) {
      //картинка отпечатка
      var finger = e.target.closest(".row").querySelector('img');

      //отображаем выбранный отпечаток
      var blob = new Blob([e.target.files[0]], { type: "img/png" });

      var urlValue = URL.createObjectURL(blob);

      finger.src = urlValue;
      URL.revokeObjectURL(blob);
    };

    _this8.makeFingerModal = function () {

      var elems = document.querySelector('#fingerModal');
      _this8.modalController = M.Modal.init(elems);
    };

    _this8.makeAccessModal = function () {

      var elems = document.querySelector('#accessModal');
      _this8.modalAccessController = M.Modal.init(elems);
    };

    _this8.makeViolationModal = function () {

      var elems = document.querySelector('#violationModal');
      _this8.modalViolationController = M.Modal.init(elems);
    };

    _this8.makeViolationUserModal = function () {

      var elems = document.querySelector('#userViolationModal');
      _this8.modalUserViolation = M.Modal.init(elems);
    };

    _this8.onUserViolationClick = function () {

      if (!store.getState().currentUserData[0]) return;
      socket.emit('userViolations', store.getState().currentUserData[0].id); //запросим все нарушения пользователя
    };

    _this8.omFingerTriggerClick = function () {
      var _this8$state3 = _this8.state,
          infoName = _this8$state3.infoName,
          infoSurname = _this8$state3.infoSurname,
          infoFarthername = _this8$state3.infoFarthername;


      if (!infoName || !infoSurname || !infoFarthername) return;

      var currentID = store.getState().currentUserData[0].id;

      socket.emit('getFingerInfo', currentID);
    };

    _this8.cardContent = function (param) {
      var _this8$state4 = _this8.state,
          name = _this8$state4.name,
          surname = _this8$state4.surname,
          farthername = _this8$state4.farthername,
          speciality = _this8$state4.speciality,
          accessLevel = _this8$state4.accessLevel;
      var _this8$state5 = _this8.state,
          infoAccessLevel = _this8$state5.infoAccessLevel,
          infoDate = _this8$state5.infoDate,
          infoFarthername = _this8$state5.infoFarthername,
          infoSurname = _this8$state5.infoSurname,
          infoName = _this8$state5.infoName,
          infoSpeciality = _this8$state5.infoSpeciality;
      //операции с отделами

      var deptData = _this8.state.deptData;

      //добавление изображения

      var pin = _this8.state.pin;

      //информация для модального окна

      var modalInfo = _this8.state.modalInfo;

      //данные проходной

      var _this8$state6 = _this8.state,
          accessData = _this8$state6.accessData,
          violationData = _this8$state6.violationData;

      //данные одного прохода

      var _this8$state7 = _this8.state,
          accessCurrentData = _this8$state7.accessCurrentData,
          violationCurrentData = _this8$state7.violationCurrentData;

      //список нарушений конкретного пользователя

      var userViolationData = _this8.state.userViolationData;


      switch (param) {
        // ДОБАВЛЕНИЕ СОТРУДНИКА ------------------------------------------------------------------------------------------
        case 'addUser':
          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  '\u041D\u043E\u0432\u044B\u0439 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A'
                ),
                React.createElement('input', { type: 'text', placeholder: '\u0418\u043C\u044F', value: name, onInput: _this8.onValueInput.bind(_this8, 'name') }),
                React.createElement('input', { type: 'text', placeholder: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F', value: surname, onInput: _this8.onValueInput.bind(_this8, 'surname') }),
                React.createElement('input', { type: 'text', placeholder: '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E', value: farthername, onInput: _this8.onValueInput.bind(_this8, 'farthername') }),
                React.createElement('input', { type: 'text', 'class': 'datepicker', placeholder: '\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F' }),
                React.createElement('input', { type: 'text', placeholder: '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C', value: speciality, onInput: _this8.onValueInput.bind(_this8, 'speciality') }),
                React.createElement('input', { type: 'text', placeholder: '\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430', value: accessLevel, onInput: _this8.onValueInput.bind(_this8, 'accessLevel') }),
                React.createElement(
                  'div',
                  { className: 'row' },
                  React.createElement(
                    'div',
                    { className: 'col s5' },
                    React.createElement('img', { width: '100px', height: '100px', id: 'fingerImg' })
                  ),
                  React.createElement(
                    'div',
                    { className: 'col s7' },
                    React.createElement('input', { type: 'text',
                      value: pin,
                      placeholder: '\u041F\u0418\u041D-\u043A\u043E\u0434',
                      onInput: _this8.onValueInput.bind(_this8, 'pin')
                    }),
                    React.createElement(
                      'label',
                      { id: 'finger' },
                      React.createElement(
                        'span',
                        { 'class': 'btn #5e35b1 deep-purple darken-1', title: 'PNG \u0444\u043E\u0440\u043C\u0430\u0442!' },
                        ' \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B '
                      ),
                      React.createElement('input', { type: 'file', id: 'myFile', onChange: _this8.onImageFileChange })
                    )
                  )
                )
              ),
              React.createElement(
                'div',
                { 'class': 'card-action' },
                React.createElement(
                  'a',
                  { onClick: _this8.onAddUserButtonClick, href: '#' },
                  '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                )
              )
            )
          );

        //ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ------------------------------------------------------------------------------------
        case '':
        case 'userInfo':
          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0435'
                ),
                React.createElement(
                  'label',
                  null,
                  ' \u0418\u043C\u044F :',
                  React.createElement('input', { type: 'text', placeholder: '\u0418\u043C\u044F',
                    onInput: _this8.onValueInput.bind(_this8, 'infoName'),
                    value: infoName ? infoName : "" })
                ),
                React.createElement(
                  'label',
                  null,
                  ' \u0424\u0430\u043C\u0438\u043B\u0438\u044F :',
                  React.createElement('input', { type: 'text', placeholder: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F',
                    onInput: _this8.onValueInput.bind(_this8, 'infoSurname'),
                    value: infoSurname ? infoSurname : "" }),
                  ' '
                ),
                React.createElement(
                  'label',
                  null,
                  '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E :  ',
                  React.createElement('input', { type: 'text', placeholder: '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E',
                    onInput: _this8.onValueInput.bind(_this8, 'infoFarthername'),
                    value: infoFarthername ? infoFarthername : "" }),
                  ' '
                ),
                React.createElement(
                  'div',
                  { className: 'row' },
                  React.createElement(
                    'div',
                    { className: 'col s6' },
                    React.createElement(
                      'label',
                      null,
                      ' \u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F : ',
                      React.createElement('input', { type: 'text', placeholder: '\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F',
                        onInput: _this8.onValueInput.bind(_this8, 'infoDate'),
                        value: infoDate ? infoDate : "" }),
                      ' '
                    ),
                    ' '
                  ),
                  React.createElement(
                    'div',
                    { className: 'col s6' },
                    React.createElement(
                      'label',
                      null,
                      ' \u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430 :',
                      React.createElement('input', { type: 'text', placeholder: '\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430',
                        onInput: _this8.onValueInput.bind(_this8, 'infoAccessLevel'),
                        value: infoAccessLevel ? infoAccessLevel : "" })
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'row' },
                  React.createElement(
                    'div',
                    { className: 'col s8' },
                    React.createElement(
                      'label',
                      null,
                      '  \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C : ',
                      React.createElement('input', { type: 'text', placeholder: '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
                        onInput: _this8.onValueInput.bind(_this8, 'infoSpeciality'),
                        value: infoSpeciality ? infoSpeciality : "" }),
                      ' '
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col s2' },
                    React.createElement(
                      'a',
                      { id: 'fingerInfo',
                        className: 'btn-floating btn-medium waves-effect waves-light #5e35b1 deep-purple darken-1',
                        onClick: _this8.omFingerTriggerClick
                      },
                      React.createElement(
                        'i',
                        { 'class': 'material-icons' },
                        'fingerprint'
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col  s2' },
                    React.createElement(
                      'a',
                      { id: 'userViolation',
                        className: 'btn-floating btn-medium waves-effect waves-light #5e35b1 deep-purple darken-1'

                      },
                      React.createElement(
                        'i',
                        { 'class': 'material-icons', onClick: _this8.onUserViolationClick },
                        'error'
                      )
                    )
                  )
                ),
                React.createElement(UserViolationModal, {
                  modalInfo: userViolationData,
                  headers: ["Тип нарушения", "Место", "Дата", "Время"]
                }),
                _this8.makeViolationUserModal(),
                React.createElement(FingerModal, {
                  modalInfo: modalInfo

                })
              ),
              React.createElement(
                'div',
                { 'class': 'card-action' },
                React.createElement(
                  'a',
                  { href: '#', onClick: _this8.onChangeUserDataButtonClick, className: 'changeButton' },
                  '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C'
                ),
                React.createElement(
                  'a',
                  { href: '#', onClick: _this8.onDeleteUserDataButtonClick, className: 'rightButton' },
                  '\u0423\u0434\u0430\u043B\u0438\u0442\u044C'
                )
              )
            ),
            _this8.makeFingerModal()
          );
        //ДОБАВЛЕНИЕ ОТДЕЛА-------------------------------------------------------------------------------
        case "addDept":

          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  ' \u041E\u0442\u0434\u0435\u043B'
                ),
                React.createElement(
                  'div',
                  { 'class': 'row' },
                  React.createElement(
                    'div',
                    { className: 'col s6' },
                    React.createElement('input', { type: 'text', placeholder: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0442\u0434\u0435\u043B\u0430',
                      onInput: _this8.onValueInput.bind(_this8, 'deptName') })
                  ),
                  React.createElement(
                    'div',
                    { className: 'col s6' },
                    React.createElement('input', { type: 'text', placeholder: '\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u043F\u0443\u0441\u043A\u0430',
                      onInput: _this8.onValueInput.bind(_this8, 'deptAccessLevel')
                    })
                  ),
                  React.createElement(
                    'div',
                    { className: 'col s12' },
                    React.createElement(
                      'button',
                      { 'class': 'btn waves-effect waves-light #5e35b1 deep-purple darken-1 col s12',
                        type: 'submit',
                        name: 'action',
                        onClick: _this8.onAddDeptButtonClick
                      },
                      '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                    )
                  )
                ),
                React.createElement(DeptTable, {
                  info: deptData,
                  headers: ["Отдел", "Допуск", ""]
                })
              )
            )
          );
        //ПОИСК----------------------------------------------------------------------------------------------- 
        case "search":

          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement('div', { 'class': 'card-image' }),
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  '\u041F\u043E\u0438\u0441\u043A'
                ),
                React.createElement(SearchField, {
                  placeholderText: 'ID',
                  checkboxText: 'ID',
                  name: 'ID'
                }),
                React.createElement(SearchField, {
                  placeholderText: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F',
                  checkboxText: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F',
                  name: 'surname'
                }),
                React.createElement(SearchField, {
                  placeholderText: '\u0418\u043C\u044F',
                  checkboxText: '\u0418\u043C\u044F',
                  name: 'name'
                }),
                React.createElement(SearchField, {
                  placeholderText: '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E',
                  checkboxText: '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E',
                  name: 'farthername'
                }),
                React.createElement(SearchField, {
                  placeholderText: '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
                  checkboxText: '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C',
                  name: 'speciality'
                }),
                React.createElement(SearchField, {
                  placeholderText: '\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430',
                  checkboxText: '\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u0430',
                  name: 'accessLevel'
                }),
                React.createElement(
                  'div',
                  { 'class': 'row' },
                  React.createElement(
                    'button',
                    { 'class': 'btn waves-effect waves-light #5e35b1 deep-purple darken-1 col s12',
                      type: 'submit',
                      name: 'action',
                      onClick: _this8.onSearchButtonClick },
                    '\u041F\u043E\u0438\u0441\u043A'
                  )
                ),
                React.createElement('div', { className: 'row' })
              ),
              React.createElement('div', { 'class': 'card-action' })
            )
          );

        //  ОТОБРАЖЕНИЕ ДОПУЩЕННЫХ СОТРУДНИКОВ
        case 'access':

          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement('div', { 'class': 'card-image' }),
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  '\u0414\u043E\u043F\u0443\u0441\u043A'
                ),
                React.createElement(AccessTable, {
                  headers: ["Пункт пропуска", "Дата", "Время"],
                  mode: 'access',
                  info: accessData,
                  className: 'accessTable',
                  onTableClick: _this8.onAccessTableClick
                }),
                React.createElement(AccessModal, {
                  modalInfo: accessCurrentData
                }),
                React.createElement(DeletionAccess, {
                  calendarInit: _this8.onAddItemChanges,
                  periodEventName: 'deletePeriodAccess'
                })
              ),
              _this8.makeAccessModal()
            )
          );

        //  ОТОБРАЖЕНИЕ НАРУШЕНИЙ
        case 'violation':

          return React.createElement(
            Fragment,
            null,
            React.createElement(
              'div',
              { 'class': 'card ' },
              React.createElement('div', { 'class': 'card-image' }),
              React.createElement(
                'div',
                { 'class': 'card-content' },
                React.createElement(
                  'h6',
                  { 'class': 'cardCaption' },
                  ' \u041D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435 '
                ),
                React.createElement(ViolationTable, {
                  headers: ["Пункт пропуска", "Дата", "Время"],
                  mode: 'violation',
                  info: violationData,
                  className: 'violationTable',
                  onTableClick: _this8.onViolationTableClick
                }),
                React.createElement(ViolationModal, {
                  modalInfo: violationCurrentData
                }),
                React.createElement(DeletionViolation, {
                  calendarInit: _this8.onAddItemChanges,
                  periodEventName: 'deletePeriodViolation'
                })
              ),
              _this8.makeViolationModal()
            )
          );

        default:
          return null;
      }
    };

    _this8.onAddItemChanges = function () {
      //инициализируем переключатель дат и настраиваем календарь

      setTimeout(function () {
        var datePick = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(datePick, {
          format: 'dd.mm.yyyy',
          firstDay: 1,
          yearRange: [1950, new Date().getFullYear()],
          i18n: { //переводим календарь
            cancel: "Отмена",
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekdaysAbbrev: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

          }
        });
        //    });
      });
    };

    _this8.onChangeUserDataButtonClick = function () {
      var _this8$state8 = _this8.state,
          infoAccessLevel = _this8$state8.infoAccessLevel,
          infoDate = _this8$state8.infoDate,
          infoFarthername = _this8$state8.infoFarthername,
          infoSurname = _this8$state8.infoSurname,
          infoName = _this8$state8.infoName,
          infoSpeciality = _this8$state8.infoSpeciality;

      var confirmResult = confirm("Вы действительно хотите сохранить изменения?");
      if (!confirmResult) return;
      var currentUserId = store.getState().currentUserData[0].id;

      socket.emit('changeUserData', {
        id: currentUserId,
        name: infoName,
        surname: infoSurname,
        farthername: infoFarthername,
        date: infoDate,
        accessLevel: infoAccessLevel,
        speciality: infoSpeciality
      });
    };

    _this8.onDeleteUserDataButtonClick = function () {
      var confirmResult = confirm("Вы действительно хотите удалить данные сотрудника?");
      if (!confirmResult) return;
      var currentUserId = store.getState().currentUserData[0].id;

      socket.emit('deleteUserData', currentUserId);
    };

    _this8.onSearchButtonClick = function (e) {
      _this8.setState({
        filterParam: "",
        filterValue: ""
      });

      var activePage = _this8.props.activePage;


      var checkboxes = e.target.closest('.card-content').querySelectorAll('input[checked]');
      if (!checkboxes || !checkboxes.length) return;

      //обьект с настройками поиска на отправку на сервер
      var sendObject = {};

      for (var i = 0; i < checkboxes.length; i++) {
        sendObject[checkboxes[i].getAttribute('name')] = checkboxes[i].closest('p').children[0].value;
      }

      socket.emit('searchInfo', { data: sendObject, page: activePage, fieldsPerPage: store.getState().fieldNumber });
    };

    _this8.onAccessTableClick = function (e) {
      if (!e.target.tagName == "TD") return;

      var currentRow = e.target.parentElement;
      var data = {
        deptName: currentRow.children[0].innerHTML,
        date: currentRow.children[1].innerHTML,
        time: currentRow.children[2].innerHTML
      };

      socket.emit('getCurrentAccessInfo', data);

      //  this.modalAccessController.open();

    };

    _this8.onViolationTableClick = function (e) {
      if (!e.target.tagName == "TD") return;
      // this.modalViolationController.open();


      var currentRow = e.target.parentElement;
      var data = {
        deptName: currentRow.children[0].innerHTML,
        date: currentRow.children[1].innerHTML,
        time: currentRow.children[2].innerHTML
      };

      socket.emit('getCurrentViolationInfo', data);
    };

    _this8.state = {
      personMode: '', //режим в котором меню
      name: '',
      surname: '',
      farthername: '',
      speciality: "",
      accessLevel: '',
      //состояние из информационных input
      infoDate: '',
      infoName: '',
      infoSurname: '',
      infoFarthername: '',
      infoSpeciality: "",
      infoAccessLevel: '',
      //добавление отдела
      deptName: '',
      deptAccessLevel: '',

      deptData: [],

      pin: "", //пин-код пользователя

      //модальное окно просмотра отпечатков
      modalInfo: {},

      accessData: [], //данные пропусков
      violationData: [], //данные нарушений

      accessCurrentData: {}, // пропуск
      violationCurrentData: {}, // нарушение

      userViolationData: [] //нарушения конкретного пользователя


      //контроллеры модальных окон
    };_this8.modalController; //обновление отпечатка
    _this8.modalAccessController; //проходы
    _this8.modalViolationController; //нарушения
    _this8.modalUserViolation; //нарушение конкретного пользователя


    //ссылка  на первое изображение для фокуса
    _this8.firstImage = React.createRef();
    return _this8;
  }

  //ввод значения в INPUT


  //нажатие на иконку с пользователем 

  //нажатие на иконку меню с добавление пользователя 


  //кнопка добавления отдела

  //иконка поиска


  //иконка журнала доступа


  //иконка нарушений


  //добавление отдела


  //кнопка добавленяи пользователя


  //на изменение отпечатка пальца


  //инициализация модалки отпечатков


  //инициализация модалки доступа


  //инициализация модалки нарушений


  //инициализация модалки нарушений


  //нажатие на кнопку для активирования модалки конкретного пользователя


  //нажатие на кнопку активирования модального окна


  //динамически генерируем содержимое карточки


  //навесить обработчик если выбран нужный элемент-иконка добавления


  //на изменение пользовательских данных


  //удаление данных сотрудника


  //запускаем процедуру поиска


  // нажатие на таблицу проходов


  // нажатие на таблицу нарушений


  _createClass(PersonInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this9 = this;

      //сделаем подсвеченным первый пункт при загрузке
      var imageElem = this.firstImage.current;
      imageElem.click();

      //подписка на изменение Redux store
      var unsubscribe = store.subscribe(function () {
        var userData = store.getState().currentUserData[0];
        _this9.setState({
          personMode: store.getState().personMode
        });

        if (!userData) return;

        _this9.setState({
          infoDate: userData.date,
          infoAccessLevel: userData.accessLevel,
          infoName: userData.name,
          infoSurname: userData.surname,
          infoFarthername: userData.farthername,
          infoSpeciality: userData.speciality

        });
      });
      //данные отделов
      socket.on('$getDeptData', function (data) {
        _this9.setState({
          deptData: data
        });
      });

      //получить информацию об отпечатке
      socket.on('$getFingerInfo', function (data) {
        _this9.setState({
          modalInfo: data
        });

        _this9.modalController.open();
      });

      socket.on('$getAccess', function (data) {
        _this9.setState({
          accessData: data
        });
      });

      socket.on('$getViolation', function (data) {
        _this9.setState({
          violationData: data
        });
      });

      //получить данные о текущем нарушении
      socket.on('$getCurrentViolationInfo', function (data) {
        _this9.setState({
          violationCurrentData: data
        });
        _this9.modalViolationController.open();
      });

      //получить данные о текущем доступе
      socket.on('$getCurrentAccessInfo', function (data) {
        _this9.setState({
          accessCurrentData: data
        });
        _this9.modalAccessController.open();
      });

      //получить список нарушений
      socket.on('$userViolations', function (data) {
        _this9.setState({
          userViolationData: data
        });
        _this9.modalUserViolation.open();
      });

      //обновим нарушения
      socket.on("$updateViolations", function () {
        socket.emit('getViolation');
      });

      //обновим доступы
      socket.on("$updateAccess", function () {
        socket.emit('getAccess');
      });

      //обновим отделы
      socket.on("$updateDepts", function () {
        socket.emit('getDeptData');
      });
      //обновим пользователей
      socket.on("$updateUsers", function () {
        console.log("Событие инициировано");
        socket.emit('getUsers', { page: 1, fieldsPerPage: store.getState().fieldNumber });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var personMode = this.state.personMode;

      //cсылка на нарушения

      var violationRef = this.props.violationRef;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          'div',
          { 'class': 'col s1 imageMenu' },
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', ref: this.firstImage, onClick: this.onAccountIconClick },
              'account_circle'
            ),
            ' '
          ),
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', onClick: this.onAddUserIconClick },
              'add_circle'
            ),
            ' '
          ),
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', onClick: this.onSearchIconClick },
              ' search'
            ),
            ' '
          ),
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', onClick: this.onAddDeptIconClick },
              'business_center'
            ),
            ' '
          ),
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', onClick: this.onAccessIconClick },
              'assignment'
            ),
            ' '
          ),
          React.createElement(
            'div',
            null,
            ' ',
            React.createElement(
              'i',
              { 'class': 'medium material-icons menuIcon', ref: violationRef, onClick: this.onViolationIconClick },
              'error'
            ),
            ' '
          )
        ),
        React.createElement(
          'div',
          { 'class': 'col s4 ' },
          this.cardContent(personMode)
        )
      );
    }
  }]);

  return PersonInfo;
}(Component);

//изменить иконку меню


function changeMenuItem(e, modeName) {
  removeHighlight();
  e.target.classList.add('choosedIcon');
  store.dispatch(setPersonMode(modeName));
}

//убирает выделение со всех элементов-иконок в меню
function removeHighlight() {
  [].slice.apply(document.querySelectorAll('.menuIcon')).map(function (item) {
    if (!item.classList.contains('choosedIcon')) return;
    item.classList.remove('choosedIcon');
  });
}

export default PersonInfo;