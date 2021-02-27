
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

    soma(p2){
        return new Ponto(this.x + p2.x, this.y + p2.y);
    }

    sub(p2){
        return new Ponto(this.x - p2.x, this.y - p2.y);
    }

    mult(a){
        return new Ponto(this.x*a, this.y*a);
    }
}

class Hermite{
    constructor(a, b, c, d, div){
        this.vert = [a, b, c, d];
        this.div = div;
        this.pontos = [];
    }

    calculaPontos(){
        this.pontos.length = 0;
        let temp;
        let h = [];
        for(let i=0; i<=this.div; i++){
            let t = [];
            t[0] = i/this.div;
            for(let j=1; j<4; j++)
                t[j] = t[j-1]*t[0];

            h[0] = 2*t[3] -3*t[2] + 1;
            h[1] = -2*t[3] +3*t[2];
            h[2] = t[3] -2*t[2] + t[1];
            h[3] = t[3] -t[2];

            temp = new Ponto(0,0);
            temp = temp.soma(this.vert[0].mult(h[0]));
            temp = temp.soma(this.vert[1].mult(h[1]));
            temp = temp.soma(this.vert[2].sub(this.vert[0]).mult(5*h[2]));
            temp = temp.soma(this.vert[3].sub(this.vert[1]).mult(5*h[3]));

            this.pontos.push(temp);
        }
    }

    draw(c, status){
        let i, j, len, out="";
        for(i=0, len=this.vert.length; i<len; i++){
            c.stroke(200,200,200);
            c.strokeWeight(2);
            this.vert[i].draw(c, c.color(55,0,0), 3);
        }
        c.strokeWeight(1.3);
        c.stroke(50, 50, 55);
        c.line(this.vert[0].x, this.vert[0].y, this.vert[2].x, this.vert[2].y);
        c.line(this.vert[1].x, this.vert[1].y, this.vert[3].x, this.vert[3].y);
       
        for(i=1; 100*i<=this.div*status; i+=1){
            c.stroke('magenta');
            c.strokeWeight(2);
            c.line(this.pontos[i-1].x, this.pontos[i-1].y, this.pontos[i].x, this.pontos[i].y);
        }

        out += "P0 = ("+this.vert[0].x+", "+this.vert[0].y+"), ";
        out += "P1 = ("+this.vert[1].x+", "+this.vert[1].y+"), ";
        let v0 = this.vert[2].sub(this.vert[0]).mult(5), v1 = this.vert[3].sub(this.vert[1]).mult(5);
        out += "P0' = ("+v0.x+", "+v0.y+"), ";
        out += "P1' = ("+v1.x+", "+v1.y+"), ";

        return out;
    }
}

let canvas = document.getElementById("curva"); //canvas holder
let status = document.getElementById("sp"); //slider progresso
let auto = document.getElementById("pa"); //slider progresso
let saida = document.getElementById("saidaHermite"); //saida do canvas

let curvaHermite =  new Hermite(
            new Ponto(1*screen.width/10, 1.2*screen.height/10),
            new Ponto(1*screen.width/10, 3*screen.height/10),
            new Ponto(3*screen.width/10, 1.2*screen.height/10),
            new Ponto(3*screen.width/10, 3*screen.height/10),
            80
        );

// let bezier3 =  new Bezier3(
//             new Ponto(1*screen.width/10, 1.2*screen.height/10),
//             new Ponto(3*screen.width/10, 1.2*screen.height/10),
//             new Ponto(3*screen.width/10, 3*screen.height/10),
//             new Ponto(1*screen.width/10, 3*screen.height/10),
//             80
//         );


const curva = (obj, canvas, st, pr, saida) => (c) => {
    let fRate = 1000/30, time = 0; //controle framerate
    let status = 0, pVel = 1; //progersso automatico
    let selec = 0, ultPos = null, atuPos = null; //movimentação de pontos
    c.setup = function(){
        c.createCanvas(canvas.offsetWidth,canvas.offsetHeight);
        obj.calculaPontos();
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
            let out = obj.draw(c, status);
            if(selec!=0){
                obj.vert[selec-1].draw(c, 'orange', 5);
                obj.vert[selec-1].x += atuPos[0]-ultPos[0];
                obj.vert[selec-1].y += atuPos[1]-ultPos[1];
                obj.calculaPontos();
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
        for(let i=0,len=obj.vert.length ; i<len; i++){
            if(Utils.distancia(temp,[obj.vert[i].x,obj.vert[i].y])< c.width/10)
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

let hermite = new p5(curva(curvaHermite, canvas, status, auto, saida), canvas);
