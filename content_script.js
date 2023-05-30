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
}

// Função para consultar se a prioridade é de réu preso
function consultaPrioridadePreso() {
    const palavra = 'Prioridade';
    const trs = [...document.querySelectorAll('#maisDetalhes > dl > dt')];
    const search = palavra.toLowerCase();
    trs.forEach(el => {
        const matches = el.textContent.toLowerCase().includes(search);
        if (matches) {
            const novaPri = document.createElement("div");
            novaPri.textContent = "Réu Preso";
            novaPri.id = "titlePrioridades";
            novoLocal = document.querySelector("form#navbar > ul.navbar-nav");
            novoLocal.appendChild(novaPri);
        }
    });
}


mostraLocal();
consultaPrioridadePreso();