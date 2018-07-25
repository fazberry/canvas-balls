var canvas;
var stage;
var circles = [];
var text;

function init(){
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

 	for (i = 0; i < 50; i++) {
 		var x = Math.random() * (window.innerWidth - 0) + 0;
 		var y = Math.random() * (window.innerHeight - 0) + 0;
		var circle = new createCircle(x, y);
 	}

    createjs.Ticker.framerate = 30;

   	createjs.Ticker.addEventListener("tick", function(){
   		stage.update();
   	})
	
	stage.addChild(text);
	stage.update();
}

function resize() {
	document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight;
}

resize();
window.onresize = resize;

function createCircle(x, y) {
	var self = this;
	this.x = x;
	this.y = y;
	this.speedX = Math.random() * (6 - 1) + 3;
	this.speedY = Math.random() * (6 - 1) + 3;
	this.velocity = this.speedY;
	this.falling = true;

	if(Math.random() > 0.5){
		this.speedX = -this.speedX;
	}
	
	this.circle = new createjs.Shape();

    this.circle.graphics.beginFill(getRandomColor()).drawCircle(0, 0, 40);

    this.circle.x = x;
    this.circle.y = y;

	stage.addChild(this.circle);

	createjs.Ticker.addEventListener("tick", function(){

		// Add gravity
		// if(self.falling){
		// 	self.velocity += 0.05;
		// } else if(self.velocity > 0){
		// 	self.velocity -= 0.05
		// } else {
		// 	self.falling = true;
		// }


		// Balls drop vertically 
		self.circle.x += self.speedX;
		if(self.falling){
			self.circle.y += self.velocity;
		} else {
			self.circle.y -= self.velocity;
		}

		// Make the balls bounce vertically
		if (self.circle.y >= stage.canvas.height) { 
        	self.speedY = -self.speedY;
        	self.falling = false;
        	self.velocity *= 0.8;
        	if(self.speedX > 0) {
        		self.speedX -= 0.1;
        		if(self.speedX < 0) {
        			self.speedX = 0
        		}
        	} else if(self.speedX < 0) {
        		self.speedX += 0.1;
        		if(self.speedX > 0) {
        			self.speedX = 0
        		}
        	}

        	self.circle.y = stage.canvas.height;
       	}

       	// Stop balls go off the top
       	if (self.circle.y < 0) { 
        	self.speedY = -self.speedY;
        	self.circle.y = 0;
       	}

       	// Make the balls bounce horizontally
       	if (self.circle.x > stage.canvas.width) { 
        	self.speedX = -self.speedX;
        	self.circle.x = stage.canvas.width;
       	}

	});

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}