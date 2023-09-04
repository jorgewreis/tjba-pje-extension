// Função de espera em milisegundos
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para criação de um elemento HTML após o carregamento completo do DOM
async function inserirDivPontos() {
    if (document.querySelector(".navbar-header") != null) {
        await waitForDOMLoad();
        let locationDiv = document.querySelector(".navbar-header");
        console.log("Criando div para display de pontos...");
        locationDiv.style.position = "relative";

        let conteudo = "<div class='text'>ATOS: </div><div class='pontuacao' style='margin-left: 10px;'>?</div><div class='button'><input class='mini-button' type='button' value='send to database'></div>";
        let novoElemento = document.createElement("div");
        novoElemento.innerHTML = conteudo;
        novoElemento.className = "divPontos";

        locationDiv.appendChild(novoElemento);

        locationDiv = document.querySelector(".divPontos");
        locationDiv.style.cssText = "position: absolute; display: flex; flex-direction: row; align-items: center; font-size: 10px; font-weight: 400; color: whitesmoke; top: 10px; left: calc(40vw)";
        locationDiv = document.querySelector(".divPontos > .pontuacao");
        if(locationDiv != null){
            console.log("Div criada com sucesso!");            
        } else {
            console.log("Erro ao criar div!");
        }
    }
}

// Função para verificar se o DOM foi carregado
function waitForDOMLoad() {
    return new Promise(resolve => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", resolve);
        }
    });
}

// Função para verificar se existe um arquivo de pontos no computador do usuario, caso não exista, cria um novo arquivo em uma pasta especifica
function buscaArquivo(){ 
    const fs = require('fs');
    const path = require('path');
    const dir = path.join(__dirname, 'pontos');
    
    // verificar se o arquivo existe, caso não exista, criar arquivo
    const caminho = path.join(dir, 'pontos.txt');
    let pontos = [{usuario: 'usuario', pontos: 0}];
    let dados = Buffer.alloc(pontos.length, JSON.stringify(pontos), 'utf-8');

    if (!fs.existsSync(caminho)){
        fs.writeFileSync(caminho, dados);
    }
}

inserirDivPontos();