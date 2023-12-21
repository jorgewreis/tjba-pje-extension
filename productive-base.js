function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

atosemTarefas = [
    {
        "id": 1, "ato": "consultaDocumento","pontos": 1,"tarefa": "[google-extension] Consulta de Documento no PJe"
    },
    {
        "id": 2, "ato": "consultaProcesso","pontos": 1,"tarefa": "[google-extension] Consulta de Processo no PJe"
    }
]

function addAtos(tarefa, proc) {
    // procura na variável atosemTarefas o ato que corresponde a tarefa informada e retorna o resultado
    let ResultConsulta = atosemTarefas.find( ({ ato }) => ato === tarefa );
    let pontos = 0;
    if (ResultConsulta) {
        pontos = ResultConsulta.pontos;        
    }
    let processo = proc;
    
    // criar um formulário oculto na página para enviar os dados para o banco de dados através da Classe ;./class/Produtividade.php
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'https://ios1vcrime.com.br/requests/extensionProdPost.php';
    form.target = 'iframe';
    const inputName = document.createElement('input');
    inputName.type = 'hidden';
    inputName.name = 'user';
    inputName.value = 'Jorge Wanderley';

    const inputPontos = document.createElement('input');
    inputPontos.type = 'hidden';
    inputPontos.name = 'pts';
    inputPontos.value = pontos;

    const inputDesc = document.createElement('input');
    inputDesc.type = 'hidden';
    inputDesc.name = 'desc';
    inputDesc.value = ResultConsulta.tarefa;

    const inputProc = document.createElement('input');
    inputProc.type = 'hidden';
    inputProc.name = 'proc';
    inputProc.value = processo;
    
    form.appendChild(inputName);
    form.appendChild(inputPontos);
    form.appendChild(inputDesc);
    form.appendChild(inputProc);
    document.body.appendChild(form);
    form.submit();
    
    // após o envio, deletar formulario
    //form.remove();
}

// função para carregar os cliques nos botões e gerar pontuação
function carregaCliques(){
    console.log(Dom());
    // verifica se o botão de consulta de processo existe, se existir, adiciona o evento de click
    if(document.querySelector(".media.interno .media-body span") != null){
        function adicionarEvento(elemento) {
            elemento.addEventListener("click", function() {
                let proc = "0000000-00.0000.8.05.0103";
                if (document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child") != null) {
                    proc = document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child").textContent;
                }
                addAtos("consultaDocumento", proc);
            });
        }

        // Seleciona todos os elementos que correspondem ao seletor
        const elementosTarefaNumeroProcesso = document.querySelectorAll(".media.interno .media-body span");

        // Itera sobre os elementos e adiciona o evento a cada um
        elementosTarefaNumeroProcesso.forEach(adicionarEvento);
    }

    if(document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child") != null){
        document.querySelector("#frameTarefas > div > div.col-md-5.btn-toolbar.pb-5.toolbar-processo > button:last-child").addEventListener("click", function() {
            addAtos("consultaProcesso");
        });
    }
}

// verifica se o DOM foi carregado ou se está em andamento ainda
function Dom(){
    return document.readyState;
}

carregaCliques();