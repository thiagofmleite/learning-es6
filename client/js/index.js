/*
* Esse código só serviu pra primeira aula
*/


/*
* querySelector é um seletor que usa atributos do CSS para selecionar elementos do DOM
*/
var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

console.log(campos);

var tbody = document.querySelector('table tbody');


document
.querySelector('.form')
.addEventListener('submit', function(event){
    
    // Evita que o form submit recarregue a página
    event.preventDefault(); 
    
    // Adicionando linhas à tabela 
    var tr = document.createElement('tr');
    // Adicionando células à linha
    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        
        // Adiciona a td ao tr
        tr.appendChild(td);
    });

    // Adicionando o volume (quantidade x valor)
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);

    // Adicionando a tr ao tbody
    tbody.appendChild(tr);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0;

    campos[0].focus();
});