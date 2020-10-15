class Triangulo{
    constructor(p1, p2, p3) {
        this.vertices = [p1,p2,p3];
        this.pontos=[];
        this.malha = null;
        this.limites = [];
    };

    calculaPontos(){
        var p1 = this.vertices[0], p2 = this.vertices[1], p3 = this.vertices[2];
        var x = Math.min(p1[0],p2[0],p3[0]), mx = Math.max(p1[0],p2[0],p3[0]); // menor x maior x
        var y = Math.min(p1[1],p2[1],p3[1]), my = Math.max(p1[1],p2[1],p3[1]); // menor y maior y
        this.pontos = [];
        y = Math.round(y/(this.malha.tamanho))*this.malha.tamanho+this.malha.tamanho/2;
        for(var i=y;i<=my;i+=this.malha.tamanho){
            var ex = this.calculaIntervalo(i, x, mx);
            this.limites.push(this.pontos.length);
            this.limites.push([ex[0],i]);
            this.limites.push([ex[1],i]);
            ex[0] = Math.round(ex[0]/(this.malha.tamanho))*this.malha.tamanho+this.malha.tamanho/2;
            for(var j=ex[0];j<=ex[1];j+=this.malha.tamanho){
                this.pontos.push(this.malha.toMalha([j,i]));
            }
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
                    if(temp[0]>=x && temp[0]<=mx){
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
            if(status<=97){
                var j;
                for(j=0;j<this.limites.length; j+=3){
                    if(this.pontos.length*(status-3)/97<this.limites[j])
                        break;
                }
                line(this.limimites[j+1][0],);

            }
            y = Math.round(y/(this.malha.tamanho))*this.malha.tamanho+this.malha.tamanho/2;
            fill('magenta');
            noStroke();
            for(var i=0; i<this.pontos.length*(status-3)/97;i++){
                let temp = this.malha.toCanvas(this.pontos[i])
                square(temp[0],temp[1], this.malha.tamanho);
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

function setup() {
    var c = createCanvas(ch.offsetWidth,ch.offsetHeight);
    c.parent('scanline');

    sp.step = "0";
    sm.step = "0";

    cm.checked= desenhaMalha;
    pa.checked= autoPlay;

    m = new Malha(parseFloat(sm.value));
    t = new Triangulo([width/2,20],[width/4,120],[3*width/4,300]);
    t.malha = m;
    t.calculaPontos();


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
            if(stat<=0 || stat>=100){
                stat = Math.round(stat);
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

        if(cm.checked) //Desenha malha
            m.draw();

        var temp = t.draw(parseFloat(sp.value)); //desenha a reta
        // console.log(t.pontos.length);
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
