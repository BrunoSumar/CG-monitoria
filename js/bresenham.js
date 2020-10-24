class Bresenham{
    constructor(p1,p2) {
        this.pontos = [];
        this.malha = null;
        this.oct = null;
        this.vertices = [p1,p2];
    };

    calculaPontos(){
        let v = [this.malha.toMalha(this.vertices[0]),this.malha.toMalha(this.vertices[1])];
        let dx = Math.abs(v[1][0]-v[0][0]);
        let dy = Math.abs(v[1][1]-v[0][1]);
        let ax = (v[0][0]<v[1][0])? 1 : -1;
        let ay = (v[0][1]<v[1][1])? 1 : -1;
        let erro = (dx > dy)? dx : -dy;
        dx*=2; dy*=2;

        let x = v[0][0], y = v[0][1];
        this.pontos = [];
        let i =0;
        while(true){
            this.pontos.push([x,y]);
            if ( x==v[1][0] && y==v[1][1] ){
                console.log('foi');
                break;
            }
            let temp = erro;
            if(temp > -dx){
                erro += -dy;
                x += ax;
            }
            if (temp < dy){
                erro += dx;
                y += ay;
            }
            if(i >123000){
                break;
            }
            i++;
        }
    };

    draw(status){
        var temp = null;
        for(let i = 0; i<this.pontos.length*(status-3)/94 && i<this.pontos.length; i++){
            temp = this.malha.toCanvas(this.pontos[i]);
            noStroke();
            fill('magenta');
            square(temp[0],temp[1],this.malha.tamanho);
        }
        if(status > 3 && status<=97 && temp){
            stroke(100);
            strokeWeight(.9);
            let v = [this.malha.toCanvasMiddle(this.malha.toMalha(this.vertices[0])),this.malha.toCanvasMiddle(this.malha.toMalha(this.vertices[1]))];
            line(v[0][0],v[0][1],v[1][0],v[1][1]);
            strokeWeight(8.5);
            // stroke("red");
            // point(temp[0]+3*this.oct, temp[1]+this.oct);
            stroke('blue');
            point(this.vertices[0][0], this.vertices[0][1]);
            point(this.vertices[1][0], this.vertices[1][1]);
        }
    }
}


// Rasterização de retas DDA
// DOM
var ch = document.getElementById("bresenham"); //canvas holder
var sp = document.getElementById("sp"); //slider Progresso fs
var sm = document.getElementById("sm"); // slider Malha
var cm = document.getElementById("cm"); // checkbox malha
var pa = document.getElementById("pa"); // checkbox malha
var out = document.getElementById("saidaBresenham");
// framerate
var fRate = 25; // seta framerate
var time = 0; //auxiliar framerate
// Variaveis de controle
var desenhaMalha = true;
var autoPlay = true;
var velocidade = 0.5;
var stat = parseFloat(sp.value);;
//
var m; //malha
var b;
var vS;
var mPos;

function setup() {
    var c = createCanvas(ch.offsetWidth,ch.offsetHeight);
    c.parent('bresenham');

    sp.step = "0";
    sm.step = "0";

    cm.checked= desenhaMalha;
    pa.checked= autoPlay;

    m = new Malha(parseFloat(sm.value));
    b = new Bresenham([width/5,height/4],[4*width/5,3*height/4]);
    b.malha = m;

    b.calculaPontos();

    vS = 0;
    mPos = [mouseX, mouseY];

    fRate = 1000/fRate;
  }

function draw() {
    time+=deltaTime;
    if(time>=fRate){
        time-=fRate;
        background(246);

        if(pa.checked){ // Execução automatica
            if(parseFloat(sp.value)!=Math.round(stat)){
                pa.checked = false;

            }
            stat += velocidade;
            if(stat<=0){
                stat = Math.max(0,stat);
                velocidade*=-1;
            }else if(stat>=100){
                stat = Math.min(100,stat);
                velocidade*=-1;
            };
            sp.value = stat;
        }
        else{
            stat = parseFloat(sp.value);
        }

        if( parseFloat(sm.value) != m.tamanho){
            m.tamanho = parseFloat(sm.value);
            b.calculaPontos();
        }

        b.draw(stat);

        if(cm.checked) //Desenha malha
            m.draw();

        if(vS!=0){
            stroke('orange');
            strokeWeight(10);
            point(b.vertices[vS-1][0],b.vertices[vS-1][1]);
            b.vertices[vS-1][0] -= mPos[0]-mouseX;
            b.vertices[vS-1][1] -= mPos[1]-mouseY;
            b.calculaPontos();
        }
        mPos = [mouseX, mouseY];
        //infos da reta no canvas
        // let saida = "P1=("+r.extremos[0]+"), P2=("+r.extremos[1]+")";
        // saida += "<br> Dx: "+r.dx+", Dy: "+r.dy;
        // if(temp!=undefined)
        //     saida += ", Último ponto: ("+temp[0]+","+temp[1]+")";
        // out.innerHTML = saida;

    }
}

function windowResized() {
    resizeCanvas(ch.offsetWidth, ch.offsetHeight);
}

function mousePressed(){
    if(mouseX<0 || mouseX>=width || mouseY<0 || mouseY>=height)
    {
        return true;
    }
    var temp = [mouseX,mouseY];
    for(var i=0; i<b.vertices.length;i++){
        if(Utils.distancia(temp,  b.vertices[i])<width/10)
        {
            vS=i+1;
            break;
        }
    }
    return false;
}

function mouseReleased(){
    vS = 0;
}
