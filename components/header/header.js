var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          deptName = _props.deptName,
          renderFlasher = _props.renderFlasher,
          alarm = _props.alarm;

      return React.createElement(
        Fragment,
        null,
        React.createElement(
          "nav",
          null,
          React.createElement(
            "div",
            { "class": "nav-wrapper #4527a0 deep-purple darken-3" },
            React.createElement(
              "a",
              { href: "#", "class": "brand-logo" },
              "\u0411\u0430\u0440\u044C\u0435\u0440 "
            ),
            React.createElement(
              "ul",
              { id: "nav-mobile", "class": "right hide-on-med-and-down" },
              renderFlasher && alarm ? renderFlasher() : null,
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "" },
                  deptName
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(Component);

export default Header;