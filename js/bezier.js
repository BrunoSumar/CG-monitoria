
class Ponto{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(c, cor, tam){
        c.stroke(cor);
        c.strokeWeight(tam);
        c.point(this.x,this.y);
    }

    static interpol(t, p1, p2){
        return new Ponto((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y);
    }
}


class Bezier1{
    constructor(a, b, div){
        this.vert = [a, b];
        this.div = div;
        this.pontos = [];
    }

    calculaPontos(){
        this.pontos.length = 0;
        for(let i=0; i<=this.div; i++){
            let t = i/this.div;
            this.pontos.push(Ponto.interpol(t, this.vert[0],this.vert[1]));
        }
    }

    draw(c, status){
        let i, j, len, out="";
        this.vert[0].draw(c, c.color(55,0,0), 4);
        for(i=1, len=this.vert.length; i<len; i++){
            c.stroke(200,200,200);
            c.strokeWeight(2);
            c.line(this.vert[i-1].x, this.vert[i-1].y, this.vert[i].x, this.vert[i].y);
            this.vert[i].draw(c, c.color(55,0,0), 3);
        }

        for(i=1; 100*i<=this.div*status; i++){
            c.stroke('magenta');
            c.strokeWeight(2);
            c.line(this.pontos[i-1].x, this.pontos[i-1].y, this.pontos[i].x, this.pontos[i].y);
        }

        for(j=0, len=this.vert.length; j<len; j++){
            out += "P"+j+" = ("+this.vert[j].x+", "+this.vert[j].y+"), ";
        }
        return  out + "t = " + (status/100).toFixed(2);
    }
}

class Bezier2{
    constructor(a, b, c, div){
        this.vert = [a, b, c];
        this.div = div;
        this.pontos = [];
    }

    calculaPontos(){
        this.pontos.length = 0;
        let temp1, temp2;
        for(let i=0; i<=this.div; i++){
            let t = i/this.div;
            temp1 = Ponto.interpol(t,this.vert[0],this.vert[1]);
            temp2 = Ponto.interpol(t,this.vert[1],this.vert[2]);
            this.pontos.push(Ponto.interpol(t, temp1,temp2));
            this.pontos.push(temp1);
            this.pontos.push(temp2);

        }
    }

    draw(c, status){
        let i, j, len, out="";
        this.vert[0].draw(c, c.color(55,0,0), 4);
        for(i=1, len=this.vert.length; i<len; i++){
            c.stroke(200,200,200);
            c.strokeWeight(2);
            c.line(this.vert[i-1].x, this.vert[i-1].y, this.vert[i].x, this.vert[i].y);
            this.vert[i].draw(c, c.color(55,0,0), 3);
        }

        for(i=3; 100*i<=this.div*3*status; i+=3){
            c.stroke('magenta');
            c.strokeWeight(2);
            c.line(this.pontos[i-3].x, this.pontos[i-3].y, this.pontos[i].x, this.pontos[i].y);
        }
        c.stroke(c.color('rgba(102, 204, 255,0.6)'));
        c.line(this.pontos[i-2].x, this.pontos[i-2].y, this.pontos[i-1].x, this.pontos[i-1].y);
        this.pontos[i-3].draw(c, 'blue', 5);

        for(j=0, len=this.vert.length; j<len; j++){
            out += "P"+j+" = ("+this.vert[j].x+", "+this.vert[j].y+"), ";
        }
        return  out + "t = " + (status/100).toFixed(2);
    }
}

class Bezier3{
    constructor(a, b, c, d, div){
        this.vert = [a, b, c, d];
        this.div = div;
        this.pontos = [];
    }

    calculaPontos(){
        this.pontos.length = 0;
        let temp1, temp2, temp3;
        for(let i=0; i<=this.div; i++){
            let t = i/this.div;

            temp1 = Ponto.interpol(t,this.vert[0],this.vert[1]);
            temp2 = Ponto.interpol(t,this.vert[1],this.vert[2]);
            temp3 = Ponto.interpol(t,this.vert[2],this.vert[3]);
            this.pontos.push(temp1);
            this.pontos.push(temp2);
            this.pontos.push(temp3);

            temp1 = Ponto.interpol(t,temp1,temp2);
            temp2 = Ponto.interpol(t,temp2,temp3);
            this.pontos.push(temp1);
            this.pontos.push(temp2);

            this.pontos.push(Ponto.interpol(t, temp1,temp2));

        }
    }

    draw(c, status){
        let i, j, len, out="";
        this.vert[0].draw(c, c.color(55,0,0), 4);
        for(i=1, len=this.vert.length; i<len; i++){
            c.stroke(200,200,200);
            c.strokeWeight(2);
            c.line(this.vert[i-1].x, this.vert[i-1].y, this.vert[i].x, this.vert[i].y);
            this.vert[i].draw(c, c.color(55,0,0), 3);
        }

        for(i=6; 100*i<=this.div*6*status; i+=6){
            c.stroke('magenta');
            c.strokeWeight(2);
            c.line(this.pontos[i-1].x, this.pontos[i-1].y, this.pontos[i+5].x, this.pontos[i+5].y);
        }
        c.stroke(c.color('rgba(102, 204, 255,0.6)'));
        c.line(this.pontos[i-6].x, this.pontos[i-6].y, this.pontos[i-5].x, this.pontos[i-5].y);
        c.line(this.pontos[i-5].x, this.pontos[i-5].y, this.pontos[i-4].x, this.pontos[i-4].y);
        c.stroke(c.color('rgba(153, 254, 103,0.6)'));
        c.line(this.pontos[i-3].x, this.pontos[i-3].y, this.pontos[i-2].x, this.pontos[i-2].y);
        this.pontos[i-1].draw(c, 'blue', 5);

        for(j=0, len=this.vert.length; j<len; j++){
            out += "P"+j+" = ("+this.vert[j].x+", "+this.vert[j].y+"), ";
        }
        return  out + "t = " + (status/100).toFixed(2);
    }
}

let canvas1 = document.getElementById("curva1"); //canvas holder
let statusB1 = document.getElementById("spB1"); //slider progresso
let autoB1 = document.getElementById("paB1"); //slider progresso
let saidaB1 = document.getElementById("saidaBezier1"); //saida do canvas

let bezier1 =  new Bezier1(
            new Ponto(screen.width/10, screen.height/10),
            new Ponto(100+screen.width/10, 120+screen.height/10),
            100
        );

let canvas2 = document.getElementById("curva2"); //canvas holder
let statusB2 = document.getElementById("spB2"); //slider progresso
let autoB2 = document.getElementById("paB2"); //slider progresso
let saidaB2 = document.getElementById("saidaBezier2"); //saida do canvas

let bezier2 =  new Bezier2(
            new Ponto(1.7*screen.width/10, screen.height/10),
            new Ponto(screen.width/10, 2.2*screen.height/10),
            new Ponto(2.5*screen.width/10, 3*screen.height/10),
            100
        );

let canvas3 = document.getElementById("curva3"); //canvas holder
let statusB3 = document.getElementById("spB3"); //slider progresso
let autoB3 = document.getElementById("paB3"); //slider progresso
let saidaB3 = document.getElementById("saidaBezier3"); //saida do canvas

let bezier3 =  new Bezier3(
            new Ponto(1*screen.width/10, 1.2*screen.height/10),
            new Ponto(3*screen.width/10, 1.2*screen.height/10),
            new Ponto(3*screen.width/10, 3*screen.height/10),
            new Ponto(1*screen.width/10, 3*screen.height/10),
            80
        );


const curva = (bezier, canvas, st, pr, saida) => (c) => {
    let fRate = 1000/30, time = 0; //controle framerate
    let status = 0, pVel = 1; //progersso automatico
    let selec = 0, ultPos = null, atuPos = null; //movimentação de pontos
    c.setup = function(){
        c.createCanvas(canvas.offsetWidth,canvas.offsetHeight);
        bezier.calculaPontos();
    }
    c.draw = function(){
        time+=c.deltaTime;
        if(time>=fRate){
            time-=fRate;
            ultPos = atuPos;
            atuPos = [c.mouseX, c.mouseY];
            if(pr.checked){
                if(Math.round(status)!=parseFloat(st.value))
                    pr.checked = false;

                status += pVel;
                status = Math.max(0,status);
                status = Math.min(100,status);
                if(status==100 || status==0)
                    pVel *= -1;

                st.value = status;
            }else{
                status = parseFloat(st.value);
            }

            c.background('#f6f6f6');
            let out = bezier.draw(c, status);
            if(selec!=0){
                bezier.vert[selec-1].draw(c, 'orange', 5);
                bezier.vert[selec-1].x += atuPos[0]-ultPos[0];
                bezier.vert[selec-1].y += atuPos[1]-ultPos[1];
                bezier.calculaPontos();
            }

            saida.innerHTML = out;

        }
    }
    c.windowResized = function() {
        c.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight);
    }
    c.mousePressed = function(){
        if(c.mouseX<0 || c.mouseX>=c.width || c.mouseY<0 || c.mouseY>=c.height)
        {
            return true;
        }
        var temp = [c.mouseX, c.mouseY];
        for(var i=0; i<bezier.vert.length;i++){
            if(Utils.distancia(temp,[bezier.vert[i].x,bezier.vert[i].y])< c.width/10)
            {
                selec =i+1;
                break;
            }
        }
        return false;
    }
    c.mouseReleased = function(){
        selec = 0;
    }
};

let curva1 = new p5(curva(bezier1, canvas1, statusB1, autoB1, saidaB1), canvas1);
let curva2 = new p5(curva(bezier2, canvas2, statusB2, autoB2, saidaB2), canvas2);
let curva3 = new p5(curva(bezier3, canvas3, statusB3, autoB3, saidaB3), canvas3);
