import {View} from './View';

export class MensagemView extends View{
    
    constructor(elemento){
        // super eu repasso a informação ao elemento Pai a qual a classe herda
        super(elemento);
    }
    
    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
    
}