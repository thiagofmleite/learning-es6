export class DateHelper{

    constructor(){
        throw new Error('A classe DateHelper é estática');
    }
    
    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }

    static textParaData(texto){
        // Fail Fast caso não siga o padrão YYYY-MM-DD
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error('Deve estar no formado yyyy-mm-dd');

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

}