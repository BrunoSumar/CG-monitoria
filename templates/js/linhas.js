function updateLineCount(obj, pai, lin){
    let altura = parseInt(window.getComputedStyle(obj).height);
    let tamLinha = parseFloat(window.getComputedStyle(obj).getPropertyValue("line-height"));
    let linhas = "";
    let max=Math.ceil(altura/tamLinha);
    for(let i=1;i<=max;i++){
        linhas += i+'\n';
    }
    lin.innerHTML = linhas;
}

function teste(a){
    let t = document.getElementById(a);
    return (c)=>{t.style.background = c};
}

function createCodLines(){
    let cods = document.getElementsByClassName('origemLinhas');
    cods = Array.from(cods);
    for(let i=0, len=cods.length; i<len; i++){
        // Criando novos elementos
        let pai = cods[i].parentNode;
        let container = document.createElement('div');
        let linhas = document.createElement('span');
        let config = {childList: true };
        let obs = new MutationObserver(() => {
            updateLineCount(cods[i], pai, linhas);
        });
        // Configurando elementos
        obs.observe(cods[i],config);
        linhas.classList += 'linhas';
        cods[i].contentEditable = true;
        cods[i].spellcheck = false;
        container.classList += 'caixa';
        // Posicionando elementos
        pai.appendChild(container);
        container.appendChild(linhas);
        container.appendChild(cods[i]);
        // Iniciando contador
        updateLineCount(cods[i], pai, linhas);
    }

}
