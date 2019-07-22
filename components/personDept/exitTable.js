var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';

//таблица для нарушений и пропусков

var ExitTable = function (_Component) {
  _inherits(ExitTable, _Component);

  function ExitTable(props) {
    _classCallCheck(this, ExitTable);

    return _possibleConstructorReturn(this, (ExitTable.__proto__ || Object.getPrototypeOf(ExitTable)).call(this, props));
  }

  _createClass(ExitTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var mode = this.props.mode;

      switch (mode) {
        case "violation":
          socket.emit('getViolation');
          break;
        case "access":
          socket.emit('getAccess');
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          headers = _props.headers,
          info = _props.info,
          onTableClick = _props.onTableClick;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          'div',
          { className: 'tableContainer row' },
          React.createElement(
            'table',
            { className: 'highlight', onClick: onTableClick },
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
                    item.deptName
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
          )
        )
      );
    }
  }]);

  return ExitTable;
}(Component);

export default ExitTable;