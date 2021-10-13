 let canvas = document.querySelector('canvas');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 canvas.style.background = 'black';
 let c = canvas.getContext('2d');

 var mouse = {
   x: innerWidth/2,
   y: innerHeight/2
 }

 window.addEventListener('mousemove', e => {
   mouse.x = event.x;
   mouse.y = event.y;
 })

 window.addEventListener('resize', () => {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
 })

 let colorArray = ['red', 'green', 'grey', 'white', 'yellow']

 function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  Ball.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

 let gravity = 1;
 let friction = 0.90;

 Ball.prototype.update = function() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity; // adding gravity 
      console.log(this.dy)
    }

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) { 
      this.dx = -this.dx;
    }
    
    this.y += this.dy;

    if (this.dy.toFixed(3) == '0.000' || this.dy.toFixed(3) == "-0.000") {
      this.dx = 0;
    }
    this.x += this.dx;
  }


 // Implementation 
 let ballArray = [];
 let ball;
 function init() {
   for (let i = 0; i < 40; i++) {
     let radius = 30;
     let x = Math.random() * (innerWidth - radius * 2) + radius;
     let y = Math.random() * (innerHeight/2) + radius;
     let dx = (Math.random() - 0.5) * 4; //random value between -2 and 2
     ball = new Ball(x, y, dx, 2, radius);
     if (i == 39) ball.color = 'gold';
     ballArray.push(ball)
   }


 }

 // Animation loop
 function animate() {
   requestAnimationFrame(animate);
   // clear the canvas - c.clearRect(x, y, width, height)
   c.clearRect(0, 0, innerWidth, innerHeight);
   // c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y)
   
   ballArray.forEach(ball => {
     ball.draw();
     ball.update();
   })
 }


 init()
 animate();