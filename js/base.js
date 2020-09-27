class Vect{
    static cross(v1, v2){ //produto vetorial
        if(!v1[2])
          v1.push(0);
        if(!v2[2])
          v2.push(0);
        var a = v1[1]*v2[2]-v1[2]*v2[1];
        var b = v1[2]*v2[0]-v1[0]*v2[2];
        var c = v1[0]*v2[1]-v1[1]*v2[0];

        return [a,b,c];
  }
}

class Malha{
    constructor(t){
        this.tamanho = t;  // tamanho de cadacelula da malha
    };

    toMalha(p){  // retorna as coordanadas de um ponto numa malha
        var temp = [];
        temp[0] = Math.floor(p[0]/this.tamanho);
        temp[1] = Math.floor(p[1]/this.tamanho);
        return temp;
    };

    toCanvas(p){
        return [p[0]*this.tamanho, p[1]*this.tamanho];
    }

    toCanvasMiddle(p){
        var temp = [];
        temp[0] = p[0]*this.tamanho + this.tamanho/2;
        temp[1] = p[1]*this.tamanho + this.tamanho/2;
        return temp;
    }

    draw(){
        var x0=this.tamanho, y0=0, x1=this.tamanho, y1=height;

        strokeWeight(this.tamanho/40);
        stroke(120/this.tamanho);
        while(x0<=width){
            line(x0,y0,x1,y1);
            x0+=this.tamanho;
            x1+=this.tamanho;
        }
        x0=0; y0=this.tamanho; x1=width; y1=this.tamanho;

        while(y0<=height){
            line(x0,y0,x1,y1);
            y0+=this.tamanho;
            y1+=this.tamanho;
        }
    };
}

class Reta{
    constructor(p1, p2) {
        this.extremos = [p1,p2];
        this.pontos=[];
        this.malha = null;
        this.dx = null;
        this.dy = null;
    };

    calculaPontos(){
        var mp1 = this.extremos[0];
        var mp2 = this.extremos[1];
        this.dx = mp2[0]-mp1[0], this.dy = mp2[1]-mp1[1];
        var delta = Math.ceil(Math.max(Math.abs(this.dx),Math.abs(this.dy))/this.malha.tamanho);
        this.dx /= delta;  this.dx = Math.min(this.malha.tamanho,this.dx);
        this.dy /= delta;  this.dy = Math.min(this.malha.tamanho,this.dy);

        var x = mp1[0], y = mp1[1];
        this.pontos = [];
        for(var i=0;i<=delta;i++){
            let temp = this.malha.toMalha([x,y]);
            this.pontos.push(temp);
            x+=this.dx;
            y+=this.dy;
        }
    };

    drawDDA(status){
        let etapa1 = 3, etapa2 = 97, etapa3 = 99;
        let range = Math.min(this.pontos.length*(status-etapa1)/(etapa2-etapa1),this.pontos.length);
        var p;
        for(var i=0;i<range;i++){ // Desenha os pontos um a um de acordo com status
            fill('magenta');
            strokeWeight(this.malha.tamanho/40);
            stroke(120/this.malha.tamanho);
            p = this.malha.toCanvas(this.pontos[i]);
            square(p[0],p[1],this.malha.tamanho);
        }


        if(status<=etapa3){ // Desenhar os pontos
            if(status>etapa1){ // Desenhar contorno no último pixel pintado
                stroke('blue');
                strokeWeight(this.malha.tamanho/15);
                noFill();
                square(p[0],p[1],this.malha.tamanho);
                if(status<etapa2){  // desenha linha entre pontos
                    stroke(170);
                    strokeWeight(this.malha.tamanho/30);
                    line(this.extremos[0][0],this.extremos[0][1],this.extremos[1][0],this.extremos[1][1]);
                }
            }
            strokeWeight(this.malha.tamanho/5);
            stroke(100);
            point(this.extremos[0][0],this.extremos[0][1]);
            point(this.extremos[1][0],this.extremos[1][1]);
        };
        
        return p;
    };


    drawBresenham(){

    };
}
