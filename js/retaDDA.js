
var ch = document.getElementById("dda"); //canvas holder
var sp = document.getElementById("sp"); //slider Progresso
var sm = document.getElementById("sm"); // slider Malha
var cm = document.getElementById("cm"); // checkbox malha
var pa = document.getElementById("pa"); // checkbox malha
var fRate = 25; // seta framerate
var time = 0; //auxiliar framerate
var r; //reta
var m; //malha
// Variaveis de controle
var desenhaMalha = true;
var autoPlay = true;
var velocidade = 0.5;
var stat = parseFloat(sp.value);;

function setup() {
    var c = createCanvas(ch.offsetWidth,ch.offsetHeight);
    c.parent('dda');
    cm.checked= true;
    pa.checked= true;
    m = new Malha(parseFloat(sm.value));
    r = new Reta([width/5,4*height/5],[4*width/5,height/5]);
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

        r.drawDDA(parseFloat(sp.value)); //desenha a reta


    }
}

function windowResized() {
  resizeCanvas(ch.offsetWidth, ch.offsetHeight);
}
