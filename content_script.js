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
    let par = 0;
    let imp = 0;
    let sigiloContent = "";
    let modeloDigital = "";
    let Prio = "";
    
    for(let i = 1; i <= 30; i++) {
        for( let j = 1; j <= 15; j++) {
            if (i % 2 == 0){
                par = i + 1;
                imp = i + 2;
            } else {   
                par = i;
                imp = i + 1;
            }
        }
        let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
        if (linha == "Juízo 100% digital?") {
            let digital = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
            modeloDigital = digital.textContent;
            break;
        }              
    }

    for(let i = 1; i <= 30; i++) {
        for( let j = 1; j <= 15; j++) {
            if (i % 2 == 0){
                par = i + 1;
                imp = i + 2;
            } else {   
                par = i;
                imp = i + 1;
            }
        }
        let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
        if (linha == "Segredo de justiça?") {
            let sigilo = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
            sigiloContent = sigilo.textContent;            
            break;
        }              
    }

    for(let i = 1; i <= 30; i++) {
        for( let j = 1; j <= 15; j++) {
            if (i % 2 == 0){
                par = i + 1;
                imp = i + 2;
            } else {   
                par = i;
                imp = i + 1;
            }
        }
        let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
        if (linha == "Prioridade?") {
            let prioridade = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
            Prio = prioridade.textContent;            
            break;
        }              
    }
   
    if (sigiloContent == "SIM" || Prio != "NÃO" || modeloDigital == "SIM") {
        let novoElemento = document.createElement("div");
        novoElemento.id = "titleTags";
        let novoLocal = document.querySelector("#navbar > ul > li");
        novoLocal.appendChild(novoElemento);
        console.log("Elemento TAG criado");
    }
}

// Verifica se a página é de consulta de processo
if (window.location.href.startsWith("https://pje.tjba.jus.br/pje/Processo/ConsultaProcesso/")) {
  incluiAssuntos();
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
        verificaCampos();
        mostraDigital();
        mostraSigilo();
        mostraPrioridades();
        alteraMargemSuperior();
    }
  });
}

if (window.location.href.startsWith("https://pje.tjba.jus.br/pje/ng2/")) {
    window.addEventListener('load', function() {
        mostraLocal();
    });
}

// Função para mostrar prioridades na barra superior
function mostraPrioridades() {
    let elemento = "";
  
    for (let i = 1; i <= 30; i++) {
      let par, imp;
  
      if (i % 2 === 0) {
        par = i + 1;
        imp = i + 2;
      } else {
        par = i;
        imp = i + 1;
      }
  
      let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
      if (linha === "Prioridade?") {
        let prioridade = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
        elemento = prioridade.textContent;
        break;
      }
    }
  
    // Encontrar elementos após a vírgula
    let elementosAposVirgula = elemento.split(",").map(elemento => elemento.trim());
  
    for (let i = 0; i < elementosAposVirgula.length; i++) {
      let elementoAtual = elementosAposVirgula[i].toUpperCase();
      if (elementoAtual !== "NÃO") {
        let novoElemento = document.createElement("div");
        novoElemento.textContent = elementoAtual;
        novoElemento.id = "titlePrioridade";
        let novoLocal = document.querySelector("#navbar > ul > li > div#titleTags");
        novoLocal.appendChild(novoElemento);
      }
    }
  }
  

// Função para mostrar sigilo na barra superior
function mostraSigilo() {
    let elemento = "";
  
    for (let i = 1; i <= 30; i++) {
      let par, imp;
  
      if (i % 2 === 0) {
        par = i + 1;
        imp = i + 2;
      } else {
        par = i;
        imp = i + 1;
      }
  
      let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
      if (linha === "Segredo de justiça?") {
        let prioridade = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
        elemento = prioridade.textContent;
        break;
      }
    }
    elemento = elemento.toString().toUpperCase();
    if (elemento == "SIM") {
        const conteudo = "SEGREDO DE JUSTIÇA";
        const novoElemento = document.createElement("div");
        novoElemento.textContent = conteudo;
        novoElemento.id = "titleSigilo";
        let novoLocal = document.querySelector("#navbar > ul > li > div#titleTags");
        novoLocal.appendChild(novoElemento);
    }
}

// Função para mostrar Juízo 100% digital na barra superior
function mostraDigital() {
    let elemento = "";
  
    for (let i = 1; i <= 30; i++) {
      let par, imp;
  
      if (i % 2 === 0) {
        par = i + 1;
        imp = i + 2;
      } else {
        par = i;
        imp = i + 1;
      }
  
      let linha = document.querySelector("#maisDetalhes > dl > dt:nth-child(" + par + ")").innerHTML;
      if (linha === "Juízo 100% digital?") {
        let prioridade = document.querySelector("#maisDetalhes > dl > dd:nth-child(" + imp + ")");
        elemento = prioridade.textContent;
        break;
      }
    }
    elemento = elemento.toString().toUpperCase();
    if (elemento == "SIM") {
        const conteudo = "100% DIGITAL";
        const novoElemento = document.createElement("div");
        novoElemento.textContent = conteudo;
        novoElemento.id = "titleDigital";
        let novoLocal = document.querySelector("#navbar > ul > li > div#titleTags");
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
    let liMaisDetalhes = document.querySelector("#navbar > ul > li");
    liMaisDetalhes.appendChild(novoAssunto);
  } 

// Função para alterar margem superior do conteudo da página
function alteraMargemSuperior() {
    const referencia = document.querySelector("#pageBody > div.navbar.navbar-default.navbar-fixed-top.nav-topo > div.container-fluid");
    const margem = referencia.offsetHeight + 'px';
    document.querySelector(".timeline").style.top = margem;
    document.querySelector(".timeline").style.height = 'calc(100vh - 60px)';
    document.querySelector(".detalhe-documento").style.top = margem;
};