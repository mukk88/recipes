

$(document).ready(function(){

	
	var X=0,Y=0,Z=0;
	var top = 0;
	var left = 0;
	var topChange = 1;
	var leftChange = 2;
	var speed = 10;
	var multiplier = 1;
	var rotationX;
	var rotationY;
	var rotation = 6;
	var xMult = 1 + Math.random();
	var yMult = 1 + Math.random();
	var zMult = 1 + Math.random();


	var rotateCube = function(){

		//rotate
		X+=rotation*xMult;
		Y+=rotation*yMult;
		Z+=rotation*zMult;
		X = X % 360;
		Z = Z % 360;
		Y = Y % 360;
		rotation = rotation > 0 ? rotation-0.05 : 0 ;
		$("#cube").css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		//shift
		var height = $(window).height();
		if(top == height || top==-1){
			topChange *= -1;
		}
		if(left >= height || left<=-1){
			leftChange *= -1;
		}
		top += topChange;
		left += leftChange;
		$("#cube").css("top", top);
		$("#cube").css("left", left);

		//continue
		if(rotation > 1.2){
			setTimeout(rotateCube, speed);
		}else{
			setTimeout(stopCube, speed);
			rotationX = rotation;
			rotationY = rotation;
		}
	};

	var stopCube = function(){
		X+=rotationX;
		Y+=rotationY;
		Z+=rotation;
		var curX = X%90;
		var curY = Y%90;
		var curZ = Z%90;
		$("#cube").css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		if(curY <3 ){
			rotationY = 0;
		}
		if(curZ <1){
			rotation = 0;
		}
		if(curX <1 ){
			rotationX = 0;
		}
		if(curX > 1 || curY > 1 || curZ > 1){
			setTimeout(stopCube, speed);
		}else{
			console.log(X + ' ' + Y + ' ' + Z);
		}
	};



	//lets go
	setTimeout(rotateCube, 1000);


	
});