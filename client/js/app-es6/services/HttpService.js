export class HttpService{

    // get(url){
    //     // resolve: retorno de sucesso
    //     // reject: erro
    //     return new Promise((resolve, reject) =>{
    //         // Serão realizadas requisições assíncronas com o servidor (AJAX)
    //         let xhr = new XMLHttpRequest();
    //         // Abrindo a conexão [preparando para abrir]
    //         xhr.open('GET', url);
    //         /* Configurações para serem realizadas antes do envio */
    //         xhr.onreadystatechange = () => {
                
    //             /* ESTADOS DE UMA REQUISÃO AJAX
    //                 ** 0: requisição ainda não iniciada
    //                 ** 1: conexão com o servidor estabelecida
    //                 ** 2: requisição recebida
    //                 ** 3: processando requisição
    //                 ** 4: requisição concluída e a resposta está pronta
    //             */

    //             if(xhr.readyState == 4){
    //                 if(xhr.status == 200){
    //                     resolve(JSON.parse(xhr.responseText));
    //                 }
    //                 else{
    //                     console.log(xhr.responseText);
    //                     reject(xhr.responseText);
    //                 }
    //             }
    //         };
    //         // Enviando a requisi]ção
    //         xhr.send();
    //     });
    // }

    _handleErrors(res){
        if(!res.ok) throw new Error(res.statusText);
        else return res;
    }

    get(url){
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado){
        return fetch(url, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));
    }
}