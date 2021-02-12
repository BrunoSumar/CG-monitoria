

const showTab = (nome, bt) =>{
    let t = document.getElementsByClassName('tab');
    for(let i=0;i<t.length;i++){
        t[i].style.display = 'none';
    }

    t = document.querySelector('.'+nome);
    t.style.display = 'block';

    t = document.querySelector('button.atual');
    if(bt){
        bt.className += 'atual';
        t.className = t.className.replace('atual','');
    }
};

const filterInput = (inp)=>{
    return inp.replaceAll("<br>","").replaceAll("&nbsp","");
};

const renderCanvas = ()=>{
    // reseta canvas
    var canvas = document.getElementById('glCanvas');
    var pai = canvas.parentNode;
    pai.removeChild(canvas);
    var temp = document.createElement('canvas');
    temp.id = 'glCanvas';
    pai.appendChild(temp);

    // Combina input e remove quebras de linha
    let m = filterInput(document.querySelector('.main').innerHTML);
    let vst = filterInput(document.querySelector('.vertex').innerHTML);
    let fst = filterInput(document.querySelector('.frag').innerHTML);

    // Eval do input
    let render = new Function('VERTEX_SHADER_TEXT','FRAGMENT_SHADER_TEXT','{'+m+'}');
    render(vst, fst);
};

