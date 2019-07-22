var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import PersonInfo from './personInfo';
import InfoTable from './infoTable';
import Pagination from './pagination';
import ReactDOM from 'react-dom';

import { store } from '../../public/store/index';

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    //  this.personData = {}; //данные для занесения в таблицу
    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.onFlasherClick = function () {
      _this.violationRef.current.click();
      _this.setState({
        alarm: false
      });
    };

    _this.switchOffFlasher = function () {
      _this.setState({
        alarm: false
      });
    };

    _this.renderFlasher = function () {
      return React.createElement(
        'li',
        null,
        React.createElement('img', { src: 'migalka.gif',
          onClick: _this.onFlasherClick,
          className: 'flasher', width: '50px',
          height: '50px'
        })
      );
    };

    _this.state = {
      personData: {}, //пользователи,
      availablePages: [],
      activePage: 1,
      alarm: false //тревога

      //иконка с ссылкой
    };_this.violationRef = React.createRef();
    return _this;
  }

  //нажатие на мигалку


  //выключить мигалку


  //отрисовать мигалку


  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      socket.emit('getUsers', { page: 1, fieldsPerPage: 15 });

      //получим данные о пользователях
      socket.on('$getUsers', function (info) {
        var data = info.data,
            availablePages = info.availablePages,
            page = info.page;

        _this2.setState({
          personData: data,
          availablePages: availablePages,
          activePage: page
        });
      });

      //отловим результаты поиска  
      socket.on('$searchInfo', function (info) {
        var data = info.data,
            availablePages = info.availablePages,
            page = info.page;


        _this2.setState({
          personData: data,
          availablePages: availablePages,
          activePage: page
        });
      });

      //на тревогу
      socket.on('$alarm', function () {
        var currentMode = store.getState().personMode;
        //если на вкладке нарушений, то не показывать мигалку
        if (currentMode == "violation") return;
        _this2.setState({
          alarm: true
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          personData = _state.personData,
          availablePages = _state.availablePages,
          activePage = _state.activePage,
          alarm = _state.alarm;
      // let currentMode = store.getState().personMode;
      // console.log(currentMode);

      return React.createElement(
        Fragment,
        null,
        React.createElement(Header, {
          deptName: '\u041E\u0442\u0434\u0435\u043B \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438',
          renderFlasher: this.renderFlasher,
          alarm: alarm
        }),
        React.createElement(
          'main',
          null,
          React.createElement(
            'div',
            { 'class': 'row' },
            React.createElement(PersonInfo, {
              activePage: activePage,
              violationRef: this.violationRef,
              switchOffFlasher: this.switchOffFlasher
            }),
            React.createElement(InfoTable, {
              headers: ["ID", "Фамилия", "Имя", "Отчество", "Специальность"],
              info: personData
            })
          ),
          React.createElement(Pagination, {
            availablePages: availablePages,
            activePage: activePage
          })
        ),
        React.createElement(Footer, null)
      );
    }
  }]);

  return App;
}(Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('body'));