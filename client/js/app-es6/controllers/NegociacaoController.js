import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';

class NegociacaoController{
    
    constructor(){
        // Setando a função querySelector na variável $
        // Uso o bind() para que o querySelector continue se mantendo associado ao document
        let $ = document.querySelector.bind(document);
       
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia'
        );
       
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){
        // Carrega as negociações do IndexDB
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
                
        // Importa as negociações do webservice automaticamente
        setInterval(() => {this.importaNegociacoes();}, 3000);
    }

    adiciona(event){
        // Cancela o comportamento padrão do evento (aka submit do formulário)
        event.preventDefault();
        
        let negociacao = this._criaNegociacao();
        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaForumlario();
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaForumlario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga(){
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes(){
        // A promise (promessa) é o resultado FUTURO de uma operação
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
        
    }

    ordena(ordenaPor){
        alert(ordenaPor);
    }
    
}

let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
}