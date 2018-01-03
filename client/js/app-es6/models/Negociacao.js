/*
* O nome do arquivo em maiúsculo indica que o conteúdo é uma classe
*/
export class Negociacao{
    
    constructor(data, quantidade, valor){
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
    get data(){
        // return this._data;
        /*
        * PROGRAMAÇÃO DEFENSIVA
        */
        // Encapsulando a _data, evitando que ela seja alterada
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor
    }

    get volume(){
        return this._volume;
    }


}