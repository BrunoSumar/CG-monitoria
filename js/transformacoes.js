const getInfo = (id1, id2) =>  [document.getElementById(id1).value, document.getElementById(id2).value];

const getInfoC = (id1, id2) =>  [document.getElementById(id1).checked, document.getElementById(id2).checked];

const setInfo = (ids, vs) => {
    for(let i in ids){
        document.getElementById(ids[i]).innerHTML = vs[i];
    }
};

const transform = (p, mat) => multMat(p, transp(mat));
const transformAll = (p, mat) => {
    let temp = [];
    for(let i in p)
        temp.push(multMat([p[i]], transp(mat)));
    return temp;
};

const translacao = (tx, ty) => [[1, 0,tx],
                                [0, 1,ty],
                                [0, 0, 1]];

const escala =  (sx, sy) => [[sx, 0,0],
                             [0 ,sy,0],
                             [0 , 0,1]];

const rotacao = (a) =>   [[ Math.cos(a),Math.sin(a),0],
                          [-Math.sin(a),Math.cos(a),0],
                          [0           ,          0,1]];

const cisalhamento =  (cx, cy) => [[1 ,cx,0],
                             [cy, 1,0],
                             [0 , 0,1]];

const drawFig = function(c, fig) {
    let i = 0, len = 0;
    for(len=fig.length;i<len;i++){
        if(fig[i][0][2] == 0)
            fig[i][0][2] = 0.0001;
        fig[i][0][0] = fig[i][0][0]/fig[i][0][2];
        fig[i][0][1] = fig[i][0][1]/fig[i][0][2];
    }

    for(i=0;i<3;i++)
        c.line(fig[i][0][0],c.height-fig[i][0][1],fig[i+1][0][0],c.height-fig[i+1][0][1]);
    c.line(fig[i][0][0],c.height-fig[i][0][1],fig[0][0][0],c.height-fig[0][0][1]);

    for(i++, len=fig.length-1;i<len;i++)
        c.line(fig[i][0][0],c.height-fig[i][0][1],fig[i+1][0][0],c.height-fig[i+1][0][1]);
    c.line(fig[i][0][0],c.height-fig[i][0][1],fig[4][0][0],c.height-fig[4][0][1]);
}

const fig = [
    //janela
    [6,  2.5,1],
    [7.5,2.5,1],
    [7.5,1.5,1],
    [6,  1.5,1],
    //contorno
    [5,8,1],
    [7,6.4,1],
    [7,7.5,1],
    [8,7.5,1],
    [8,5.6,1],
    [10,4,1],
    [9,4,1],
    [9,0,1],
    [4.5,0,1],
    [4.5,3,1],
    [2.5,3,1],
    [2.5,0,1],
    [1,0,1],
    [1,4,1],
    [0,4,1]
];

let cT = document.getElementById("canvasTrans"); //canvas holder
const transl = (c) => {
    c.setup = function(){
        c.createCanvas(cT.offsetWidth,cT.offsetHeight);
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
        m = multMat(m, translacao(parseFloat(t[0])/5, parseFloat(t[1])/5));
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);

    }
    c.windowResized = function() {
        c.resizeCanvas(cT.offsetWidth, cT.offsetHeight);
    }
}
let tr = new p5(transl, cT);

let cR = document.getElementById("canvasRot"); //canvas holder
const rot = (c) => {
    c.setup = function(){
        c.createCanvas(cR.offsetWidth,cR.offsetHeight);
    }

    c.draw = function(){
        let figT =[];
        let m = null, t = getInfo('rot','rot');
        setInfo(['r11','r12','r21','r22'], ['cos('+t[0]+'°),','sen('+t[0]+'°)','-sen('+t[0]+'°),','cos('+t[0]+'°)']);
        c.background('#f6f6f6');
        m = multMat(escala(10,10),translacao(c.width/22-3, c.height/22-3));
        figT = transformAll(fig, m);
        c.stroke('rgba(200,200,200,.5)');
        c.strokeWeight(2);
        drawFig(c, figT);
        m = multMat(m,rotacao(-parseFloat(t[0])*3.1415/180));
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);

    }
    c.windowResized = function() {
        c.resizeCanvas(cR.offsetWidth, cR.offsetHeight);
    }
}
let ro = new p5(rot, cR);

let cE = document.getElementById("canvasEsc"); //canvas holder
const esc = (c) => {
    c.setup = function(){
        c.createCanvas(cE.offsetWidth,cE.offsetHeight);
    }

    c.draw = function(){
        let figT =[];
        let m = null, t = getInfo('sX','sY');
        c.background('#f6f6f6');
        m = multMat(escala(10,10),translacao(c.width/22-3, c.height/22-3));
        figT = transformAll(fig, m);
        c.stroke('rgba(200,200,200,.5)');
        c.strokeWeight(2);
        drawFig(c, figT);
        m = multMat(m,escala(parseFloat(t[0]),parseFloat(t[1])));
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);

    }
    c.windowResized = function() {
        c.resizeCanvas(cE.offsetWidth, cE.offsetHeight);
    }
}
let es = new p5(esc, cE);

let cRef = document.getElementById("canvasReflex"); //canvas holder
const ref = (c) => {
    c.setup = function(){
        c.createCanvas(cRef.offsetWidth,cRef.offsetHeight);
    }

    c.draw = function(){
        let figT =[];
        let m = null, t = getInfoC('reX','reY');
        t[0] = t[0]? -1: 1;
        t[1] = t[1]? -1: 1;
        setInfo(['ref1','ref2'],[t[0],t[1]]);
        c.background('#f6f6f6');
        m = multMat(escala(10,10),translacao(c.width/22-3, c.height/22-3));
        figT = transformAll(fig, m);
        c.stroke('rgba(200,200,200,.5)');
        c.strokeWeight(2);
        drawFig(c, figT);
        m = multMat(m,escala(t[0], t[1]));
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);

    }
    c.windowResized = function() {
        c.resizeCanvas(cRef.offsetWidth, cRef.offsetHeight);
    }
}
let re = new p5(ref, cRef);

let cCis = document.getElementById("canvasCis"); //canvas holder
const cis = (c) => {
    c.setup = function(){
        c.createCanvas(cCis.offsetWidth,cCis.offsetHeight);
    }

    c.draw = function(){
        let figT =[];
        let m = null, t = getInfo('cisX','cisY');
        c.background('#f6f6f6');
        m = multMat(escala(10,10),translacao(c.width/22-3, c.height/22-3));
        figT = transformAll(fig, m);
        c.stroke('rgba(200,200,200,.5)');
        c.strokeWeight(2);
        drawFig(c, figT);
        m = multMat(m,cisalhamento(parseFloat(t[0]),parseFloat(t[1])));
        figT = transformAll(fig, m);
        c.stroke('magenta');
        c.strokeWeight(2);
        drawFig(c, figT);

    }
    c.windowResized = function() {
        c.resizeCanvas(cCis.offsetWidth, cCis.offsetHeight);
    }
}
let ci = new p5(cis, cCis);
