// Função de ato para consulta de processos
function consultaProcesso(){
    const botaoConsulta = document.querySelector("input.btn-primary");
    if (botaoConsulta == null) {
        return;
    } else {
        botaoConsulta.addEventListener("click", function () {
            inserirPontos(2);
        });
    }
}

// Função para limpar pontos
function limparPontos() {
    let pontos = document.querySelector(".divPontos > .button > input");
    if (pontos){
        pontos.addEventListener("click", function () {
            document.querySelector(".divPontos > .pontuacao").innerHTML = "0";
            console.log("Pontos zerados!");
        });
    } else {
        return;
    }        
}

// Função para Enviar pontos para o banco de dados
function sendToDatabase(){
    limparPontos();
}

// Funções onload
consultaProcesso();
sendToDatabase();