var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import { store } from '../../public/store';
import { addCurrentUserData, setPersonMode } from '../../public/actions';

//табоица с информацией

var InfoTable = function (_Component) {
  _inherits(InfoTable, _Component);

  function InfoTable(props) {
    _classCallCheck(this, InfoTable);

    //ссылка для делегирования на таблице
    var _this = _possibleConstructorReturn(this, (InfoTable.__proto__ || Object.getPrototypeOf(InfoTable)).call(this, props));

    _this.currentTable = React.createRef();
    return _this;
  }

  _createClass(InfoTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.currentTable.current.addEventListener('click', function (e) {

        //нажал на заголовки, а не на строки таблицы
        if (e.target.closest('th')) return;
        //текущая строка
        var currentRow = e.target.closest('tr');
        socket.emit('getDetailUserInfo', { id: currentRow.children[0].innerHTML });
      });

      //получение данных конкретного пользователя
      socket.on('$getDetailUserInfo', function (data) {

        store.dispatch(addCurrentUserData(data));
        //  let unsubscribe = store.subscribe(()=>{console.log(store.getState())});
        if (store.getState().personMode != 'userInfo') document.querySelector('.imageMenu').children[0].children[0].click();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          headers = _props.headers,
          info = _props.info;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          'table',
          { ref: this.currentTable, className: 'highlight col s5 offset-s1' },
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
            null,
            info && info.length ? info.map(function (item) {

              return React.createElement(
                'tr',
                { key: item.id },
                ' ',
                React.createElement(
                  'td',
                  null,
                  item.id
                ),
                '  ',
                React.createElement(
                  'td',
                  null,
                  item.surname
                ),
                React.createElement(
                  'td',
                  null,
                  item.name
                ),
                React.createElement(
                  'td',
                  null,
                  item.farthername
                ),
                '  ',
                React.createElement(
                  'td',
                  null,
                  item.speciality
                ),
                '   '
              );
            }) : null
          )
        )
      );
    }
  }]);

  return InfoTable;
}(Component);

export default InfoTable;