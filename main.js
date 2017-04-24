window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();
var myGameArea={};
myGameArea["canvas"]=document.getElementById("GameArea");
myGameArea["start"]=function(){
	this.context=this.canvas.getContext("2d");
}

	
myGameArea["clear"]=function(){
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);

}
var arrows;
var bows;
var targets;
var targetstwo;
var blood,bloodd;
var bcX=176;
var bcY=510;
var acX=bcX;
var acY=bcY;
var flying=false;
var gravity=0.09;
var text=" ";
var end=false;

var arrow=function(src,type){
	this.vx=0;
	this.vy=0;
	this.angle=0;
	this.x=100;
	this.y=500;
	this.width=100;
	this.height=10;
	this.image=new Image();
	this.image.src=src;
	this.aupdate=function(){
		var ctx=myGameArea.context;
		ctx.save();
		// ctx.translate(nextposx,nextposy);
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();

	};

}
var bow=function(src,type){
	this.x=120;
	this.y=405;
	this.angle=0;
	this.width = 30;
	this.height = 200;
	this.image=new Image();
	this.image.src=src;
	this.bupdate=function(){
		var ctx=myGameArea.context;
		ctx.save();
		//ctx.translate(this.x,this.y);
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();
		ctx.rotate(this.angle);
		ctx.beginPath();
		  ctx.arc(bcX, bcY, 1, 0, 1 * Math.PI,false);
		  ctx.fillStyle = 'green';
		  ctx.fill();
		  ctx.lineWidth = 5;
		  ctx.strokeStyle = '#003300';
		  ctx.stroke();
	};

}
var target=function(x,y,src,type){
	this.x=x;
	this.y=y;
	this.width=300;
	this.height=200;
	this.image=new Image();
	this.image.src=src;
	this.tupdate=function(){
		var ctx1=myGameArea.context;
		ctx1.drawImage(this.image,this.x,this.y,this.width,this.height);

	};
}
var movearrow=function(){
	acX=arrows.x;
		acY=arrows.y+7;
		if(flying)
		{
			arrows.y += arrows.vy;
			arrows.x +=arrows.vx;
			arrows.vy += gravity;
			arrows.angle=Math.atan(arrows.vy/arrows.vx);
			// collides();
			if(arrow.x>myGameArea.canvas.width||arrow.y>myGameArea.canvas.height||arrow.y<0)
			{
				
				onAir=false;
			}
		}
	}
	var startGame=function(){
	console.log("hey")
	myGameArea.start();
	arrows=new arrow("arrow.png","image");
	bows=new bow("bow.png","image");
	targets=new target(1000,500,"target.png","image");
	targetstwo=new target(1000,75,"target2.png",200,200,"image");
	blood=new target(1000,500,"blood.png",200,200,"image");
	bloodd=new target(1000,75,"blood.png",200,200,"image");
	function paintCanvas() {
		ctx.clearRect(0, 0, width, height);
	}
	var updateGame=function(){
	console.log("hiiiii")
	myGameArea.clear;
	if(!end){
	movearrow();
arrows.aupdate();
bows.bupdate();
targets.tupdate();
targetstwo.tupdate();
blood.tupdate();
// myGameArea.clear();
}
}

	animloop = function() {
		updateGame();
		requestAnimFrame(animloop);
	};
	animloop();


}






myGameArea.canvas.addEventListener('mousedown',doMouseDown,true);
function doMouseDown(event){
	console.log("problem korche ki?");
	//alert(event.pageX+':'+event.pageY);
	if(flying==false)
	{
		text=" ";
		document.onmousemove=function(e)
		{	console.log("norche ki?")
			 arrows.x=e.pageX;
			 arrows.y=e.pageY;
			 console.log(arrows.x+':'+arrows.y)
			 var pointX=arrows.x,pointY=arrows.y+arrows.height/2;
			 bows.angle=arrows.angle=Math.atan2((bcY-pointY)/(bcX-pointX));
			 if(arrows.vx<8){
			 	arrows.vx=0.2*(bcX-pointX);
			 	arrows.vy=0.2*(bcY-pointY);
			}
		}
	}
	document.onmouseup=function()
		{
			console.log("am out")
			flying=true;
			bows.angle=0;
			arrows.angle=0;
			//targetstwo.angle=0;
			document.onmousemove=null;
		}
	}	

