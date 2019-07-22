var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';

var SimulForm = function (_Component) {
    _inherits(SimulForm, _Component);

    function SimulForm(props) {
        _classCallCheck(this, SimulForm);

        var _this = _possibleConstructorReturn(this, (SimulForm.__proto__ || Object.getPrototypeOf(SimulForm)).call(this, props));

        _this.onPinInput = function (_ref) {
            var value = _ref.target.value;

            _this.setState({
                pin: value
            });
        };

        _this.onImageFileChange = function (e) {
            //картинка отпечатка
            var finger = e.target.closest(".row").querySelector('img');

            //отображаем выбранный отпечаток
            var blob = new Blob([e.target.files[0]], { type: "img/png" });

            var urlValue = URL.createObjectURL(blob);

            finger.src = urlValue;
            URL.revokeObjectURL(blob);
        };

        _this.onLoginButtonClick = function () {
            var pin = _this.state.pin;


            var fileReader = new FileReader();

            //прикрепленное изображение
            var myFile = document.querySelector('#updateFinger');
            var blob = new Blob([myFile.files[0]], { type: 'img/png' });

            fileReader.readAsArrayBuffer(blob);

            fileReader.onload = function (event) {
                var finger = fileReader.result;

                if (!pin) return;

                socket.emit('deptLogin', { pin: pin, finger: finger, deptName: "Отдел упаковки" });
            };
        };

        _this.state = {
            pin: ""
        };

        return _this;
    }

    //ввод ПИН-кода


    //на изменение отпечатка в симуляции


    //нажатие на кнопку входа в систему


    _createClass(SimulForm, [{
        key: "render",
        value: function render() {
            var pin = this.state.pin;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "simulForm #303f9f indigo darken-2" },
                    React.createElement(
                        "h5",
                        null,
                        " \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \"\u0411\u0430\u0440\u044C\u0435\u0440\" "
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col s5" },
                            React.createElement("img", {
                                src: "./fingerprint.jpg",
                                width: "200px",
                                height: "200px",
                                alt: "user fingerprint",
                                id: "fingerImg",
                                className: "finger" })
                        ),
                        React.createElement(
                            "div",
                            { className: "col s7" },
                            React.createElement("input", { type: "text",
                                placeholder: "\u041F\u0418\u041D-\u043A\u043E\u0434",
                                value: pin,
                                onInput: this.onPinInput
                            }),
                            React.createElement(
                                "label",
                                { id: "finger" },
                                React.createElement(
                                    "span",
                                    { "class": "btn #5e35b1 deep-purple darken-1"

                                    },
                                    " \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B "
                                ),
                                React.createElement("input", { type: "file", id: "updateFinger", onChange: this.onImageFileChange })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "a",
                            { "class": "waves-effect waves-light btn col s5 offset-s3",
                                onClick: this.onLoginButtonClick
                            },
                            "\u0412\u043E\u0439\u0442\u0438"
                        )
                    )
                )
            );
        }
    }]);

    return SimulForm;
}(Component);

export default SimulForm;