class Triangulo{
    constructor(p1, p2, p3) {
        this.vertices = [p1,p2,p3];
        this.malha = null;
        this.limites = [];
    };

    calculaPontos(){
        var p1 = this.vertices[0], p2 = this.vertices[1], p3 = this.vertices[2];
        var x = Math.min(p1[0],p2[0],p3[0]), mx = Math.max(p1[0],p2[0],p3[0]); // menor x maior x
        var y = Math.min(p1[1],p2[1],p3[1]), my = Math.max(p1[1],p2[1],p3[1]); // menor y maior y
        this.limites = [];
        y = Math.ceil(y/(this.malha.tamanho/2))*this.malha.tamanho/2;
        if(y%this.malha.tamanho == 0) y+=this.malha.tamanho/2;
        for(var i=y;i<=my;i+=this.malha.tamanho){
            var ex = this.calculaIntervalo(i, x, mx);
            this.limites.push(i);
            this.limites.push(ex[0]);
            this.limites.push(ex[1]);
        }
    };

    calculaIntervalo(y, x, mx){
        var l = [x,y], r = [mx,y];
        var out = [];
        for (var i = 0; i < 3; i++) {
            let temp = this.calculaInterseccao(l,r,this.vertices[i],this.vertices[(i+1)%3]);
            switch (temp.length) {
                case 0:
                    break;
                case 1:
                var le = Math.min(this.vertices[i][0],this.vertices[(i+1)%3][0]), lr = Math.max(this.vertices[i][0],this.vertices[(i+1)%3][0]);
                    if(temp[0]>=le && temp[0]<=lr){
                        out.push(temp[0]);
                    }
                    break;
                case 2:
                    out = [temp[0],temp[1]];
                    return out;
                    break;
                default:
                    return 1;
            }
        }
        out.sort(function (a, b){return a - b;});
        if(out.length>2)
            out.splice(1,1);
        return out;
    };

    calculaInterseccao(A,B,C,D){
        var dx1 = B[0]-A[0], dx2 = D[0]-C[0], dy1 = B[1]-A[1], dy2 = D[1]-C[1];
        if (dx1==0){ dx1=0.00000001;} if (dx2==0){ dx2=0.00000001;}
        var a1 = dy1/dx1, a2 = dy2/dx2;
        var b1 = A[1]-a1*A[0], b2 = C[1]-a2*C[0];
        if(a1==a2){
            if(b1==b2){
                return [A[0], B[0]];
            }
            return [];
        }
        return [(b2-b1)/(a1-a2)];
    };

    draw(status){
        var p1 = this.vertices[0], p2 = this.vertices[1], p3 = this.vertices[2];
        var x = Math.min(p1[0],p2[0],p3[0]), mx = Math.max(p1[0],p2[0],p3[0]); // menor x maior x
        var y = Math.min(p1[1],p2[1],p3[1]), my = Math.max(p1[1],p2[1],p3[1]); // menor y maior y

        if(status>3){
            var i;
            for( i=0;i<this.limites.length*(status-3)/97;i+=3){
                let tx1=Math.round(this.limites[i+1]/this.malha.tamanho)*this.malha.tamanho;
                let tx2=Math.round(this.limites[i+2]/this.malha.tamanho)*this.malha.tamanho;
                let ty=Math.floor(this.limites[i]/this.malha.tamanho)*this.malha.tamanho;
                noStroke();
                fill('magenta');
                rect(tx1,ty,tx2-tx1,this.malha.tamanho);
            }
            if(i>0){i-=3;}
            if(status<=97){
                let ty=Math.floor(this.limites[i]/this.malha.tamanho)*this.malha.tamanho+this.malha.tamanho/2;
                stroke('red');
                strokeWeight(1);
                line(x,ty,mx,ty);
                strokeWeight(5);
                point(this.limites[i+1],ty);
                point(this.limites[i+2],ty);


            }
        }
        return 1;
    }
}


// Rasterização de retas DDA
// DOM
var ch = document.getElementById("scanline"); //canvas holder
var sp = document.getElementById("sp"); //slider Progresso
var sm = document.getElementById("sm"); // slider Malha
var cm = document.getElementById("cm"); // checkbox malha
var pa = document.getElementById("pa"); // checkbox malha
var out = document.getElementById("saidaSL");
// framerate
var fRate = 25; // seta framerate
var time = 0; //auxiliar framerate
// Variaveis de controle
var desenhaMalha = true;
var autoPlay = true;
var velocidade = 0.5;
var stat = parseFloat(sp.value);;
//
var r; //reta
var m; //malha
var vS = 0;// vertice selecionado
var mPos1 =[0,0]; // posição mouse
var mPos2 =[0,0]; // posição mouse

function setup() {
    var c = createCanvas(ch.offsetWidth,ch.offsetHeight);
    c.parent('scanline');

    sp.step = "0";
    sm.step = "0";

    cm.checked= desenhaMalha;
    pa.checked= autoPlay;

    m = new Malha(parseFloat(sm.value));
    t = new Triangulo([width/5,4*height/5],[width/4,height/6],[3*width/4,300]);
    t.malha = m;
    t.calculaPontos();


    fRate = 1000/fRate;
  }

function draw() {
    time+=deltaTime;
    if(time>=fRate){
        time-=fRate;
        background(246);
        mPos2=mPos1;
        mPos1 = [mouseX, mouseY];
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
            t.malha = m;
            t.calculaPontos();
        }


        var temp = t.draw(parseFloat(sp.value)); //desenha o triangulo

        stroke(205);
        strokeWeight(1);
        line(t.vertices[0][0], t.vertices[0][1],t.vertices[1][0], t.vertices[1][1]);
        line(t.vertices[0][0], t.vertices[0][1],t.vertices[2][0], t.vertices[2][1]);
        line(t.vertices[2][0], t.vertices[2][1],t.vertices[1][0], t.vertices[1][1]);

        if(cm.checked) //Desenha malha
            m.draw();

        if(vS!=0){
            stroke('orange');
            strokeWeight(6);
            point(t.vertices[vS-1][0],t.vertices[vS-1][1]);
            t.vertices[vS-1][0]+= mPos1[0]-mPos2[0];
            t.vertices[vS-1][1]+= mPos1[1]-mPos2[1];
            t.calculaPontos();
        }



         let saida = "P1=("+t.vertices[0]+"), P2=("+t.vertices[1]+"), P2=("+t.vertices[2]+")";
        out.innerHTML = saida;

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
    for(var i=0; i<t.vertices.length;i++){
        if(Utils.distancia(temp,  t.vertices[i])<width/10)
        {
            vS=i+1;
            break;
        }
    }
    t.vertices;
    return false;
}

function mouseReleased(){
    vS = 0;
}
