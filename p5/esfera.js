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
    this.x+=this.vx*(1-mouseY/height);
    this.y+=this.vy*(1-mouseY/height);
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