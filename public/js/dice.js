

$(document).ready(function(){

	
	var X=0,Y=0,Z=0;
	var top = 0;
	var left = 0;
	var topChange = 1;
	var leftChange = 2;
	var speed = 10;
	var rotationX;
	var rotationY;
	var rotation = 6;
	var xMult = 1 + Math.random();
	var yMult = 1 + Math.random();
	var zMult = 1 + Math.random();
	var shaking = false;

	var rotateCube = function(){


		shaking = true;

		//rotate
		X+=rotation*xMult;
		Y+=rotation*yMult;
		Z+=rotation*zMult;
		X = X % 360;
		Z = Z % 360;
		Y = Y % 360;
		rotation = rotation > 0 ? rotation-0.05 : 0 ;
		$("#cube").css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");
		// $("#cube2").css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		//shift
		var height = $(window).height() ? $(window).height() : window.innerHeight;
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
		// $("#cube2").css("top", top);
		// $("#cube2").css("left", left+200);

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
		// $("#cube2").css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		if(curY <1 ){
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
			shaking = false;
			// console.log(X + ' ' + Y + ' ' + Z);
		}
	};

	var startShake = function(event){

		X = 0;
		Y = 0;
		Z = 0;
		// top = 0;
		// left = 0;
		// topChange = 1;
		// leftChange = 2;
		rotation = 6;
		speed = 10;
		xMult = 1 + Math.random();
		yMult = 1 + Math.random();
		zMult = 1 + Math.random();
		rotateCube();
	}

	//lets go
	// setTimeout(rotateCube, 1000);
	$('#start').click(startShake);

	window.addEventListener("devicemotion", function(event){
		var x = event.accelerationIncludingGravity.x;
    	var y = event.accelerationIncludingGravity.y;
    	var z = event.accelerationIncludingGravity.z;
    	console.log(x + ' ' + y + ' ' + z);
    	var threshold = 12;
    	if((x > threshold || y > threshold || z > threshold ) && !shaking){
    		startShake();
    	}
	}, true);

	
});