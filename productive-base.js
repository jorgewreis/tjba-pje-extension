function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostraPontuacao() {
    if (document.querySelector(".navbar-header") != null) {
        await (Dom() == "complete");
        let nomeSobrenome = document.querySelector(".navbar-header");
        console.log("carregando pontuação...");
        nomeSobrenome.style.position = "relative";
        let atos = await atualizaPontuacao();
        let conteudo = "<div class='text'>ATOS: </div><div class='pontuacao' style='margin-left: 10px;'>" + atos + "</div><div class='button'><input class='mini-button' type='button' value='send to database'></div>";
        let novoElemento = document.createElement("div");
        novoElemento.innerHTML = conteudo;
        novoElemento.id = "titlePontuacao";

        let novoLocal = document.querySelector(".navbar-header");
        novoLocal.appendChild(novoElemento);

        let titlePontuacao = document.querySelector("#titlePontuacao");
        titlePontuacao.style.position = "absolute";
        titlePontuacao.style.display = "flex";
        titlePontuacao.style.flexDirection = "row";
        titlePontuacao.style.alignItems = "center";
        titlePontuacao.style.fontSize = "10px";
        titlePontuacao.style.fontWeight = "400";
        titlePontuacao.style.color = "whitesmoke";
        titlePontuacao.style.top = "10px";
        titlePontuacao.style.left = "calc(100vw / 2)";
    }
}

async function addAtos(tarefa, pontos) {
    console.info("adicionando atos da tarefa " + tarefa);
    let chave = "PJeAtos";
    let atos = JSON.parse(localStorage.getItem(chave)) || {};
    let pontosAntes = 0;

    for (const key in atos) {
        pontosAntes += atos[key];
    }

    if (!atos[tarefa]) {
        atos[tarefa] = pontos;
    } else {
        atos[tarefa] += pontos;
    }

    localStorage.setItem(chave, JSON.stringify(atos));

    let pontosDepois = 0;
    atos = JSON.parse(localStorage.getItem(chave)) || {};
    for (const key in atos) {
        pontosDepois += atos[key];
    }
    
    if (pontosDepois != pontosAntes) {
        console.info("Sucesso! +1 ato, total de atos: " + pontosDepois);
        atualizaPontuacao();
    } else {
        console.log("Erro ao adicionar ato!");
    }    
}

async function atualizaPontuacao() {
    let chave = "PJeAtos";
    let atos = JSON.parse(window.localStorage.getItem(chave)) || {};

    let total = 0;

    for (const key in atos) {
        total += atos[key];
    }

    console.info("total de atos: " + total);
    let divPontos = document.querySelector("#titlePontuacao > div.pontuacao");

    await new Promise(resolve => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            divPontos.textContent = "100";
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", resolve);
        }
    });    
    // divPontos.textContent = total;
}



function limparPontos() {
    let chave = "PJeAtos";
    localStorage.removeItem(chave);
    atualizaPontuacao();
}


// função para carregar os cliques nos botões e gerar pontuação
function carregaCliques(){
    // verifica se o botão de consulta de processo existe, se existir, adiciona o evento de click
    if(document.querySelector("span.tarefa-numero-processo") != null){
        function adicionarEvento(elemento) {
            elemento.addEventListener("click", function() {
                addAtos("consultaDocumento", 1);
            });
        }

        // Seleciona todos os elementos que correspondem ao seletor
        const elementosTarefaNumeroProcesso = document.querySelectorAll("span.tarefa-numero-processo");

        // Itera sobre os elementos e adiciona o evento a cada um
        elementosTarefaNumeroProcesso.forEach(adicionarEvento);
    }

    // verifica se o botão de send to database existe, se existir, adiciona o evento de limpar pontos
    if(document.querySelector("#titlePontuacao .button .mini-button") != null){
        document.querySelector("#titlePontuacao .button .mini-button").addEventListener("click", function() {
            limparPontos();
        });
    }

    if(document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child") != null){
        document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child").addEventListener("click", function() {
            addAtos("consultaProcesso", 1);
        });
    }
}

// verifica se o DOM foi carregado ou se está em andamento ainda
function Dom(){
    return document.readyState;
}

mostraPontuacao();
carregaCliques();