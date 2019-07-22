var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import { store } from '../../public/store';
import { setFieldNumber } from '../../public/actions';

var Pagination = function (_Component) {
   _inherits(Pagination, _Component);

   function Pagination(props) {
      _classCallCheck(this, Pagination);

      var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

      _this.onPageNumberClick = function (e) {
         var _store$getState = store.getState(),
             fieldNumber = _store$getState.fieldNumber;

         var currentPage = e.target.innerHTML;
         changePage(currentPage, fieldNumber);
      };

      _this.onArrowClick = function (side) {
         var _store$getState2 = store.getState(),
             fieldNumber = _store$getState2.fieldNumber;

         var _this$props = _this.props,
             activePage = _this$props.activePage,
             availablePages = _this$props.availablePages;


         switch (side) {
            case "left":
               //дальше некуда, самая первая страница
               if (activePage == availablePages[0]) return;
               changePage(activePage - 1, fieldNumber);

               break;
            case "right":

               //дальше некуда, самая последняя страница
               if (activePage == availablePages[availablePages.length - 1]) return;
               changePage(activePage + 1, fieldNumber);

               break;
         }
      };

      _this.onFieldNumberChange = function (_ref) {
         var value = _ref.target.value;

         store.dispatch(setFieldNumber(value));
         //  store.subscribe(()=>{
         //           this.setState({
         //             fieldNumber: value
         //           });
         //     });

         socket.emit('getUsers', { page: 1, fieldsPerPage: value });
      };

      _this.state = {};

      return _this;
   }
   //нажатие на номер страницы

   //нажатие на стрелочку на страницах


   //на изменение числа записей


   _createClass(Pagination, [{
      key: 'render',
      value: function render() {
         var _this2 = this;

         var _store$getState3 = store.getState(),
             fieldNumber = _store$getState3.fieldNumber;

         var _props = this.props,
             availablePages = _props.availablePages,
             activePage = _props.activePage;


         return React.createElement(
            Fragment,
            null,
            React.createElement(
               'div',
               { 'class': 'row' },
               React.createElement(
                  'ul',
                  { 'class': 'pagination col offset-s7' },
                  React.createElement(
                     'li',
                     null,
                     React.createElement(
                        'a',
                        { href: '#!', className: 'waves-effect', onClick: this.onArrowClick.bind(this, 'left') },
                        React.createElement(
                           'i',
                           { 'class': 'material-icons' },
                           'chevron_left'
                        )
                     )
                  ),
                  availablePages && availablePages.length ? availablePages.map(function (item) {
                     var nameOfClass = "waves-effect ";

                     if (activePage == item) nameOfClass += ' active ';

                     return React.createElement(
                        'li',
                        { className: nameOfClass, key: item, onClick: _this2.onPageNumberClick },
                        React.createElement(
                           'a',
                           { href: '#!' },
                           item
                        )
                     );
                  }) : React.createElement(
                     'li',
                     { 'class': 'waves-effect' },
                     React.createElement(
                        'a',
                        { href: '#!' },
                        '1'
                     )
                  ),
                  React.createElement(
                     'li',
                     { className: 'waves-effect', onClick: this.onArrowClick.bind(this, 'right') },
                     React.createElement(
                        'a',
                        { href: '#!' },
                        React.createElement(
                           'i',
                           { 'class': 'material-icons' },
                           'chevron_right'
                        )
                     )
                  )
               ),
               React.createElement(
                  'div',
                  { className: 'col s2' },
                  React.createElement(
                     'select',
                     { value: fieldNumber, onChange: this.onFieldNumberChange },
                     React.createElement(
                        'option',
                        { key: '15', value: '15' },
                        ' 15 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 '
                     ),
                     React.createElement(
                        'option',
                        { key: '20', value: '20' },
                        ' 20 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 '
                     ),
                     React.createElement(
                        'option',
                        { key: '25', value: '25' },
                        ' 25 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 '
                     ),
                     React.createElement(
                        'option',
                        { key: '30', value: '30' },
                        ' 30 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 '
                     )
                  )
               )
            )
         );
      }
   }]);

   return Pagination;
}(Component);

//поменять страницу


function changePage(page, fieldsPerPage) {
   //режим
   var mode = store.getState().personMode;
   var serverEvent = "";

   switch (mode) {
      case "search":

         var checkboxes = document.querySelector('.card-content').querySelectorAll('input[checked]');

         if (!checkboxes || !checkboxes.length) return;

         //обьект с настройками поиска на отправку на сервер
         var sendObject = {};

         for (var i = 0; i < checkboxes.length; i++) {
            sendObject[checkboxes[i].getAttribute('name').toLowerCase()] = checkboxes[i].closest('p').children[0].value;
         }

         socket.emit('searchInfo', { data: sendObject, page: +page, fieldsPerPage: fieldsPerPage });
         break;

      default:
         socket.emit('getUsers', { page: page, fieldsPerPage: fieldsPerPage });
   }
}

export default Pagination;