// Função para adicionar local de perfil do servidor na barra de menu
function mostraLocal() {
    const elemento = document.querySelector("#barraSuperiorPrincipal > div > div.navbar-collapse > ul > li > a > span.nome-sobrenome");
    if (elemento) {
        const conteudo = elemento.getAttribute('data-original-title');
        const novoElemento = document.createElement("div");
        novoElemento.textContent = conteudo;
        novoElemento.id = "titleLocal";
        let novoLocal = document.querySelector("#barraSuperiorPrincipal > div > div.navbar-collapse > ul > li");
        novoLocal.appendChild(novoElemento);
    }
};

function verificaCampos() {
    let elemento = document.querySelector("#maisDetalhes > dl > dd:nth-child(14)");
    elemento = elemento.textContent.toString().toUpperCase();
    let elemento2 = document.querySelector("#maisDetalhes > dl > dd:nth-child(22)");
    elemento2 = elemento2.textContent.toString().toUpperCase();
    if ((elemento == "SIM") || (elemento2 != "NÃO")){
        const novoElemento = document.createElement("div");
        novoElemento.id = "titleTags";
        let novoLocal = document.querySelector("form#navbar > ul.navbar-nav");
        novoLocal.appendChild(novoElemento);
    }
}

// Função para mostrar prioridades na barra superior
function mostraPrioridades() {
    let elemento = document.querySelector("#maisDetalhes > dl > dd:nth-child(22)");
    elemento = elemento.textContent.toString().toUpperCase();
    if (elemento != "NÃO") {
        const conteudo = elemento;
        const novoElemento = document.createElement("div");
        novoElemento.textContent = conteudo;
        novoElemento.id = "titlePrioridades";
        let novoLocal = document.querySelector("form#navbar > ul.navbar-nav > div#titleTags");
        novoLocal.appendChild(novoElemento);
    }
}

// Função para mostrar sigilo na barra superior
function mostraSigilo() {
    let elemento = document.querySelector("#maisDetalhes > dl > dd:nth-child(14)");
    elemento = elemento.textContent.toString().toUpperCase();
    if (elemento == "SIM") {
        const conteudo = "SEGREDO DE JUSTIÇA";
        const novoElemento = document.createElement("div");
        novoElemento.textContent = conteudo;
        novoElemento.id = "titleSigilo";
        let novoLocal = document.querySelector("form#navbar > ul.navbar-nav > div#titleTags");
        novoLocal.appendChild(novoElemento);
    }
}

// crie uma função sleep para aguardar o carregamento da página
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para incluir assuntos no menu
async function incluiAssuntos() {
    let assuntos = document.querySelector("#maisDetalhes > dl > dd:nth-child(4) > ul");
    let novoAssunto = document.createElement("div");
    novoAssunto.innerHTML = assuntos.textContent;
    novoAssunto.id = "titleAssuntos";
    let liMaisDetalhes = document.querySelector("form#navbar > ul.nav > li.mais-detalhes");
    liMaisDetalhes.appendChild(novoAssunto);
  } 

// Função para alterar margem superior do conteudo da página
function alteraMargemSuperior() {
    const referencia = document.querySelector("#pageBody > div.navbar.navbar-default.navbar-fixed-top.nav-topo > div.container-fluid");
    const margem = referencia.offsetHeight + 'px';
    document.querySelector(".timeline").style.top = margem;
    document.querySelector(".detalhe-documento").style.top = margem;
};

window.addEventListener('load', function() {
    sleep(2000);
    let assuntos = document.querySelector("#maisDetalhes > dl > dd:nth-child(4) > ul");
    let i = 0;
    while (!assuntos){
        sleep(500);
        assuntos = document.querySelector("#maisDetalhes > dl > dd:nth-child(4) > ul");
        i++;
        if (i > 6) {
            break;
        }
    };
    if (assuntos){
        incluiAssuntos();
        verificaCampos();
        mostraSigilo();
        mostraPrioridades();
        alteraMargemSuperior();
    } else {
        mostraLocal();
    }
    
});

