import {ProxyFactory} from '../services/ProxyFactory';

export class Bind{

    constructor(model, view, ...props){
        let proxy = ProxyFactory.create(model, props, model => 
            view.update(model)
        );

        // Renderizar pela primeira vez
        view.update(model);

        // Em Javascript isso é possível
        /*
        ** Como a linguagem não é fortimente tipada, é possível que um constructor
        ** retorne um outro objeto.
        */
        return proxy;
    }

}