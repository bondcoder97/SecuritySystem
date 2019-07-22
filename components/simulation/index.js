var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import ReactDOM from 'react-dom';
import SimulForm from './simulForm';

var App = function (_Component) {
   _inherits(App, _Component);

   function App(props) {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
   }

   _createClass(App, [{
      key: 'render',
      value: function render() {

         return React.createElement(
            Fragment,
            null,
            React.createElement(Header, {
               deptName: '\u041E\u0442\u0434\u0435\u043B \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0438'
            }),
            React.createElement(
               'main',
               null,
               React.createElement(
                  'div',
                  { className: 'gridContainer #9fa8da indigo lighten-3' },
                  React.createElement(SimulForm, { className: 'simulForm' })
               )
            ),
            React.createElement(Footer, null)
         );
      }
   }]);

   return App;
}(Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('body'));