import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{

    constructor(){
        this._httpService = new HttpService();
    }
    
    obterNegociacoesDaSemana(){
        
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana')
            });
        });
        
    }

    obterNegociacoesDaSemanaAnterior(){      
        return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana')
            });
        });
    }

    obterNegociacoesDaSemanaRetrasada(){      
       return new Promise((resolve, reject) => {
            this._httpService.get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            })
            .catch(erro => {
                console.log(erro);
                reject('Não foi possível obter as negociações da semana')
            });
        });
    }

    obterNegociacoes(){
        return new Promise((resolve, reject) => {
            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
                .then(negociacoes => {
                    let retorno = [];
                    negociacoes
                        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                        .forEach(negociacao => retorno.push(negociacao));
                    resolve(retorno);
                })
                .catch(erro => reject(erro));
        });
    }

    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso!')
            .catch(() => {
                throw new Error('Não foi possível adicionar a negociação')
            });
    }

    lista(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodas())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            })
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes
                    .filter(negociacao =>
                        !listaAtual
                            .some(negociacaoExistente => 
                                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Erro('Não foi possível importar as negociações')
            });
    }
        
}