"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Negociacao", Negociacao = function () {
                function Negociacao(data, quantidade, valor) {
                    _classCallCheck(this, Negociacao);

                    /*
                    * O underline é uma convenção dizendo que as propriedades só podem ser acessadas pelos métodos da classe
                    * "private"
                    */
                    // this._data = data; /* PROGRAMAÇÃO DEFENSIVA */
                    this._data = new Date(data.getTime());
                    this._quantidade = quantidade;
                    this._valor = valor;
                    this._volume = this.quantidade * this.valor;

                    // Congela o objeto para que ele não possa ser alterado
                    Object.freeze(this);
                }

                /*
                * Métodos acessadores
                * "getters"
                */


                _createClass(Negociacao, [{
                    key: "data",
                    get: function get() {
                        // return this._data;
                        /*
                        * PROGRAMAÇÃO DEFENSIVA
                        */
                        // Encapsulando a _data, evitando que ela seja alterada
                        return new Date(this._data.getTime());
                    }
                }, {
                    key: "quantidade",
                    get: function get() {
                        return this._quantidade;
                    }
                }, {
                    key: "valor",
                    get: function get() {
                        return this._valor;
                    }
                }, {
                    key: "volume",
                    get: function get() {
                        return this._volume;
                    }
                }]);

                return Negociacao;
            }());

            _export("Negociacao", Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map