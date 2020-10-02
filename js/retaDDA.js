// Rasterização de retas DDA
// DOM
var ch = document.getElementById("dda"); //canvas holder
var sp = document.getElementById("sp"); //slider Progresso
var sm = document.getElementById("sm"); // slider Malha
var cm = document.getElementById("cm"); // checkbox malha
var pa = document.getElementById("pa"); // checkbox malha
var out = document.getElementById("saidaDDA");
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
    c.parent('dda');

    sp.step = "0";
    sm.step = "0";

    cm.checked= desenhaMalha;
    pa.checked= autoPlay;

    m = new Malha(parseFloat(sm.value));
    r = new Reta([width/2, height/2],[4*width/5,height/5]);
    r.malha = m;
    r.calculaPontos();

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
            r.malha = m;
            r.calculaPontos();
        }

        if(cm.checked) //Desenha malha
            m.draw();

        var temp = r.drawDDA(parseFloat(sp.value)); //desenha a reta

        //infos da reta no canvas
        let saida = "P1=("+r.extremos[0]+"), P2=("+r.extremos[1]+")";
        saida += "<br> Dx: "+r.dx+", Dy: "+r.dy;
        if(temp!=undefined)
            saida += ", Último ponto: ("+temp[0]+","+temp[1]+")";
        out.innerHTML = saida;

    }
}

function windowResized() {
    resizeCanvas(ch.offsetWidth, ch.offsetHeight);
    r.extremos[0]=[width/2, height/2];
    r.calculaPontos();
}

function mouseClicked() {
    if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height)
        r.extremos[1]=[mouseX, mouseY];
    r.calculaPontos();
}
