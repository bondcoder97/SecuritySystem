var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';

//модальное окно для отпечатков пользователя

var FingerModal = function (_Component) {
    _inherits(FingerModal, _Component);

    function FingerModal(props) {
        _classCallCheck(this, FingerModal);

        var _this = _possibleConstructorReturn(this, (FingerModal.__proto__ || Object.getPrototypeOf(FingerModal)).call(this, props));

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

        _this.onUpdateIconClick = function () {

            var accept = confirm("Вы действительно хотите обновить снимок?");
            if (!accept) return;

            var modalInfo = _this.props.modalInfo;
            var id = modalInfo.id;
            var pin = _this.state.pin;


            var fileReader = new FileReader();

            //прикрепленное изображение
            var myFile = document.querySelector('#updateFinger');
            var blob = new Blob([myFile.files[0]], { type: 'img/png' });

            fileReader.readAsArrayBuffer(blob);

            fileReader.onload = function (event) {
                var finger = fileReader.result;

                //если поля не заполнены
                if (!pin) return;

                console.log(id);
                socket.emit('updateFingerprint', { pin: pin, finger: finger, id: id });
            };
        };

        _this.onGetFinger = function () {
            var modalInfo = _this.props.modalInfo;
            var finger = modalInfo.finger;

            console.log(finger);

            var blob = new Blob([finger], { type: 'img/png' });
            document.querySelector('#updateFingerImg').src = URL.createObjectURL(blob);

            URL.revokeObjectURL(blob);
        };

        _this.state = {
            pin: ''
            // imgURL : '' //URL обьект
        };
        return _this;
    }

    //на ввод пин-кода


    //на изменение отпечатка пальца


    //нажатие на иконку обновления


    //  получение снимка с сервера


    _createClass(FingerModal, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.onGetFinger();
        }
    }, {
        key: 'render',
        value: function render() {
            var modalInfo = this.props.modalInfo;
            var name = modalInfo.name,
                surname = modalInfo.surname,
                farthername = modalInfo.farthername,
                id = modalInfo.id,
                finger = modalInfo.finger;
            var pin = this.state.pin;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    'div',
                    { id: 'fingerModal', 'class': 'modal' },
                    React.createElement(
                        'div',
                        { 'class': 'modal-content' },
                        React.createElement(
                            'h5',
                            { className: 'modal-title' },
                            surname + ' ' + name + ' ' + farthername + ' (id: ' + id + ')'
                        ),
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col s5' },
                                React.createElement('img', { src: '',
                                    width: '200px',
                                    height: '200px',
                                    alt: 'user fingerprint',
                                    id: 'updateFingerImg',
                                    className: 'finger' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col s7' },
                                React.createElement('input', { type: 'text',
                                    value: pin,
                                    placeholder: '\u041F\u0418\u041D-\u043A\u043E\u0434',
                                    onInput: this.onPinInput
                                }),
                                React.createElement(
                                    'label',
                                    { id: 'finger' },
                                    React.createElement(
                                        'span',
                                        { 'class': 'btn #5e35b1 deep-purple darken-1',
                                            id: 'updateFingerFile'
                                        },
                                        ' \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B '
                                    ),
                                    React.createElement('input', { type: 'file', id: 'updateFinger', onChange: this.onImageFileChange })
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    ' ',
                                    React.createElement(
                                        'i',
                                        { 'class': 'large material-icons',
                                            title: '\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u043D\u0438\u043C\u043E\u043A',
                                            id: 'updateFingerButton',
                                            onClick: this.onUpdateIconClick
                                        },
                                        'update'
                                    ),
                                    ' '
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'modal-footer' },
                        React.createElement(
                            'a',
                            { href: '#!', 'class': 'modal-close waves-effect waves-green btn-flat' },
                            '\u0417\u0430\u043A\u0440\u044B\u0442\u044C'
                        )
                    )
                )
            );
        }
    }]);

    return FingerModal;
}(Component);

export default FingerModal;