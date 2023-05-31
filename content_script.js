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

// Função para consultar se a prioridade é de réu preso
function consultaPrioridadePreso() {
    const palavra = 'Réu Preso';
    const trs = [...document.querySelectorAll('#maisDetalhes > dl > dd')];
    const search = palavra.toLowerCase();
    trs.forEach(el => {
        const matches = el.textContent.toLowerCase().includes(search);
        if (matches) {
            const novaPri = document.createElement("div");
            novaPri.textContent = "Réu Preso";
            novaPri.id = "titleReuPreso";
            novoLocal = document.querySelector("form#navbar > ul.navbar-nav");
            novoLocal.appendChild(novaPri);
        }
    });
};

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
    const referencia = document.querySelector(".navbar-collapse");
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
        consultaPrioridadePreso();
        alteraMargemSuperior();
    } else {
        mostraLocal();
    }
    
});

