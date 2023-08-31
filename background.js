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
        locationDiv.style.cssText = "position: absolute; display: flex; flex-direction: row; align-items: center; font-size: 10px; font-weight: 400; color: whitesmoke; top: 10px; left: calc(50vw)";
        locationDiv = document.querySelector(".divPontos > .pontuacao");
        if(locationDiv != null){
            console.log("Div criada com sucesso!");
            verificarSessionStorage();
            
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

// Função para verificar se existe e criar se não existir um elemento no SessionStorage
function verificarSessionStorage() {
    if (sessionStorage.getItem("PJe-Atos-Pontos") == null) {
        sessionStorage.setItem("PJe-Atos-Pontos", 0);
        console.log("SessionStorage criado com sucesso!");
    } else {
        console.log("SessionStorage já existe!");
    }
}

// Função para buscar pontos do SessionStorage e atualizar o HTML
function buscarPontos() {
    verificarSessionStorage();
    let pontos = parseInt(sessionStorage.getItem("PJe-Atos-Pontos"));
    if(pontos == null || pontos == undefined || pontos == NaN || pontos == 0){
        sessionStorage.clear("PJe-Atos-Pontos");
    } else {
        pontos = parseInt(sessionStorage.getItem("PJe-Atos-Pontos"));
        console.log("Pontos no SessionStorage: " + pontos);
                
        const locationDiv = document.querySelector(".divPontos > .pontuacao");
        locationDiv.textContent = pontos;
    }
}


// Função para inserir pontos no elemento HTML
function inserirPontos(pontos) {
    verificarSessionStorage();
    let pontosAtuais = parseInt(sessionStorage.getItem("PJe-Atos-Pontos"));
    pontosAtuais += pontos;
    sessionStorage.setItem("PJe-Atos-Pontos", pontosAtuais);
    buscarPontos();
}


// Funções carregadas ao iniciar o background.js
inserirDivPontos();