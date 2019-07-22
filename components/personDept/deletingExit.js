var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';

//удаление пропускной информации за период

var DeletingExit = function (_Component) {
  _inherits(DeletingExit, _Component);

  function DeletingExit(props) {
    _classCallCheck(this, DeletingExit);

    var _this = _possibleConstructorReturn(this, (DeletingExit.__proto__ || Object.getPrototypeOf(DeletingExit)).call(this, props));

    _this.onValueInput = function (property, _ref) {
      var value = _ref.target.value;

      _this.setState(_defineProperty({}, "" + property, value));
    };

    _this.onPeriodDelete = function (e) {
      var periodEventName = _this.props.periodEventName;
      var _this$state = _this.state,
          startTime = _this$state.startTime,
          endTime = _this$state.endTime;


      var deleteInputs = document.querySelectorAll('.deletingExit input[type=text]'); //ввод для удаления

      if (!startTime || !endTime || !deleteInputs[0].value || !deleteInputs[2].value) return;

      socket.emit(periodEventName, { startTime: startTime, endTime: endTime, startDate: deleteInputs[0].value, endDate: deleteInputs[2].value });
    };

    _this.state = {
      startTime: "",
      endTime: ""
    };
    return _this;
  }

  //ввод значения в INPUT


  //удалить за период


  _createClass(DeletingExit, [{
    key: "render",
    value: function render() {
      //инициализировать клендарь и отправить событие с данными
      var calendarInit = this.props.calendarInit;
      var _state = this.state,
          startTime = _state.startTime,
          endTime = _state.endTime;

      // periodEventName = "deletePeriodAccess"

      return React.createElement(
        Fragment,
        null,
        React.createElement(
          "div",
          { className: "row deletingExit" },
          React.createElement(
            "label",
            { className: "col s3" },
            " \u0418\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0434\u0430\u0442\u0430",
            React.createElement("input", { type: "text", "class": "datepicker" })
          ),
          React.createElement(
            "label",
            { className: "col s3" },
            " \u0418\u0441\u0445\u043E\u0434\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
            React.createElement("input", { type: "text", onInput: this.onValueInput.bind(this, "startTime"), value: startTime })
          ),
          React.createElement(
            "label",
            { className: "col s3" },
            " \u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0434\u0430\u0442\u0430",
            React.createElement("input", { type: "text", "class": "datepicker" })
          ),
          React.createElement(
            "label",
            { className: "col s3" },
            " \u041A\u043E\u043D\u0435\u0447\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
            React.createElement("input", { type: "text", onInput: this.onValueInput.bind(this, "endTime"), value: endTime })
          )
        ),
        React.createElement(
          "a",
          { href: "#", className: "btn col offset-s3 #5e35b1 deep-purple darken-1", onClick: this.onPeriodDelete },
          "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434"
        ),
        calendarInit()
      );
    }
  }]);

  return DeletingExit;
}(Component);

export default DeletingExit;