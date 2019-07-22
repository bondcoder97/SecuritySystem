var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
//таблица отделов

var DeptTable = function (_Component) {
  _inherits(DeptTable, _Component);

  function DeptTable(props) {
    _classCallCheck(this, DeptTable);

    var _this = _possibleConstructorReturn(this, (DeptTable.__proto__ || Object.getPrototypeOf(DeptTable)).call(this, props));

    _this.onTrashIconClick = function (e) {
      var confirmResult = confirm('Вы действительно хотите удалить этот отдел?');
      if (!confirmResult) return;
      var currentRow = e.target.closest('tr');

      currentRow.style.display = "none";

      socket.emit('deleteDept', currentRow.children[0].innerHTML);
    };

    _this.onEditIconClick = function (e) {
      var confirmResult = confirm('Вы действительно хотите изменить данные этого отдела?');
      if (!confirmResult) return;
      var currentRow = e.target.closest('tr');

      socket.emit('editDept', { deptName: currentRow.children[0].innerHTML,
        accessLevel: currentRow.children[1].innerHTML,
        oldDeptName: currentRow.children[0].getAttribute('name')
      });
    };

    return _this;
  }

  //нажатие на корзину (удаление)

  //нажатие на иконку карандаша (изменение)


  _createClass(DeptTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //получить данные всех существующих отделов
      socket.emit('getDeptData');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          headers = _props.headers,
          info = _props.info;


      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          { className: 'tableContainer row' },
          React.createElement(
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
              { className: 'depts' },
              info && info.length ? info.map(function (item) {

                return React.createElement(
                  'tr',
                  { key: item.deptName },
                  React.createElement(
                    'td',
                    { contentEditable: 'true', name: item.deptName },
                    item.deptName
                  ),
                  React.createElement(
                    'td',
                    { contentEditable: 'true' },
                    item.accessLevel
                  ),
                  React.createElement(
                    'td',
                    null,
                    React.createElement(
                      'i',
                      { 'class': 'tiny material-icons', onClick: _this2.onEditIconClick },
                      ' create'
                    ),
                    React.createElement(
                      'i',
                      { 'class': 'tiny material-icons', onClick: _this2.onTrashIconClick },
                      ' delete'
                    )
                  )
                );
              }) : null
            )
          )
        )
      );
    }
  }]);

  return DeptTable;
}(Component);

export default DeptTable;