function esfera(x,y,r){
  this.x = x;
  this.y = y;
  this.r = r;

  this.state = 1;

  this.vx = random(24)-12;
  this.vy = random(24)-12;

  this.colisaoX = function(){
    if((this.x<r/2 && this.vx<0) ||
       (this.x>width-r/2 && this.vx>=0) )
      return true;
    return false;
  }

  this.colisaoY = function(){
    if((this.y<r/2 && this.vy<0) ||
       (this.y>height-r/2 && this.vy>=0))
      return true;
    return false;
  }

  this.atualiza = function(){
    if(this.colisaoX())
      this.vx*=-1;
    if(this.colisaoY())
      this.vy*=-1;
    this.x+=this.vx*(1-Math.min(1,1.4*mouseX/windowWidth));
    this.y+=this.vy*(1-Math.min(1,1.4*mouseY/windowHeight));
  }

  this.draw = function(){
    noStroke();
    fill(255*this.x/width,255-255*this.x/width,255*this.y/width);
    ellipse(this.x, this.y, r);

    if(this.state){
      this.atualiza();
    }
  }
}

var x = [];
var ch = document.getElementById("canvasEsfera");
var quant = 75;
var time = 0;
var fRate = 31;

function setup() {
    var c = createCanvas(ch.offsetWidth,ch.offsetHeight);
    c.parent("canvasEsfera");
    background(246);

    for(var i=1; i<quant;i++){
      x.push(new esfera(width/2,height/2, height/20+random(height/30)));
    }

    console.log(fRate);
    fRate = 1000/fRate;
  }

function draw() {
    time+=deltaTime;
    if(time>=fRate){
        time-=fRate;
        background(246);
        for(i in x){
            x[i].draw();
        }
    }
}

function windowResized() {
  resizeCanvas(ch.offsetWidth, ch.offsetHeight);
}
