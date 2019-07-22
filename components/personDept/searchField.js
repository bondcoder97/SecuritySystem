var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
//поисковый элемент

var SearchField = function (_Component) {
  _inherits(SearchField, _Component);

  function SearchField(props) {
    _classCallCheck(this, SearchField);

    var _this = _possibleConstructorReturn(this, (SearchField.__proto__ || Object.getPrototypeOf(SearchField)).call(this, props));

    _this.onCheckboxChange = function () {
      var isChecked = _this.state.isChecked;

      _this.setState({
        isChecked: !isChecked
      });
    };

    _this.state = {
      isChecked: false // выбран ли checkbox
    };
    return _this;
  }
  //изменение checkbox


  _createClass(SearchField, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          placeholderText = _props.placeholderText,
          checkboxText = _props.checkboxText,
          name = _props.name;
      var isChecked = this.state.isChecked;


      return React.createElement(
        Fragment,
        null,
        React.createElement(
          "p",
          null,
          isChecked ? React.createElement("input", { "class": "searchCheck", type: "text", placeholder: placeholderText }) : null,
          React.createElement(
            "label",
            null,
            React.createElement("input", { type: "checkbox", name: name, onChange: this.onCheckboxChange, defaultChecked: isChecked }),
            React.createElement(
              "span",
              null,
              " ",
              checkboxText
            )
          )
        )
      );
    }
  }]);

  return SearchField;
}(Component);

export default SearchField;