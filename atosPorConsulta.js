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

// Funções onload
consultaProcesso();