const identidade = () => [[1,0,0],
                          [0,1,0],
                          [0,0,1]];

let ids = []; // vetor de ids
let mats = []; // vetor de transformações
let contId = 0;

const removeTabela = (btn) => {
    let pai = btn.parentElement;
    console.log(btn.id.split('_')[1]);
    ids = ids.filter((id)=>(id!='tab_'+btn.id.split('_')[1]));
    pai.remove();
};

const addTabela = (btn) => {
    let id = contId;
    contId++;
    ids.push('tab_'+id);
    let el = document.createElement('DIV');
    btn.parentElement.insertBefore(el, btn);
    el.innerHTML = "<table id=\"tab_"+id+"\"><tr><td > <input type=\"text\" value=\"1\"></td><td><input type=\"text\" value=\"0\"></td><td><input type=\"text\" value=\"0\"></td></tr><tr><td><input type=\"text\" value=\"0\"></td><td > <input type=\"text\" value=\"1\"></td><td > <input type=\"text\" value=\"0\"></td></tr><tr><td > <input type=\"text\" value=\"0\"></td><td > <input type=\"text\" value=\"0\"></td><td > <input type=\"text\" value=\"1\"></td></tr></table><button onclick=\"removeTabela(this)\" id=\"btn_"+id+"\">X</button>";
};

function buscaTabela(id){ //busca a transformação pelo id da tabela
    let t = document.getElementById(id);
    var mat = [];
    for(let i=0;i<t.rows.length;i++){
        mat.push([]);
        for(let j=0; j<t.rows.item(i).cells.length; j++){
            let inp = t.rows.item(i).cells.item(j).children.item(0).value;
            mat[i].push(analisaInput(inp));
        }
    }
    return mat;
};

const analisaInput = (str) => {
    str = str.split(' ').filter((x)=>x);
    let result = 1;
    let indx = 0;
    if(str[0]=='-'){
        result = -1;
        indx++;
    }
    switch(str[indx]){
    case 'cos':
        result*=Math.cos(str[indx+1]?-parseFloat(str[indx+1]*3.1415/180):null);
    break;
    case 'sen':
        result*=Math.sin(str[indx+1]?-parseFloat(str[indx+1]*3.1415/180):null);
        break;
    default:
        result*=parseFloat(str[indx]);
    }
    return result;
}

let cComp = document.getElementById("canvasComp"); //canvas holder
const comp = (c) => {
    c.setup = function(){
        c.createCanvas(cComp.offsetWidth,cComp.offsetHeight);
    }

    c.draw = function(){
        let figT =[];
        let m = null, t = getInfo('transX','transY');
        c.background('#f6f6f6');
        m = multMat(escala(10,10),translacao(c.width/22-3, c.height/22-3));
        figT = transformAll(fig, m);
        c.stroke('rgba(200,200,200,.5)');
        c.strokeWeight(2);
        drawFig(c, figT);
        //buscar matrizes e montar m
        let temp = escala(1,1);
        for(let i in ids){
            temp = multMat(buscaTabela(ids[i]), temp);
        }
        m = multMat(m,temp);
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);
    }
    c.windowResized = function() {
        c.resizeCanvas(cComp.offsetWidth, cComp.offsetHeight);
    }
}
let cp = new p5(comp, cComp);
