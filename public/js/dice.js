//todo make shaking local, make var objects

$(document).ready(function(){
	var speed = 10;
	var shaking = false;
	var height = 200;
	var posititions = {};
	var dicetotal = 2;

	for(var i=3;i<7;i++){
		$('#area' + i).hide();
	}

	for(var i=1;i<7;i++){
		posititions["#cube" + i] = {};
		posititions['#cube' + i].topp = 100;
		posititions['#cube' + i].leftt = 100;
	}

	var addDice = function(){
		if(dicetotal>=6){
			return;
		}
		dicetotal++;
		$('#area' + dicetotal).show();
	};

	var loseDice = function(){
		if(dicetotal<=0){
			return;
		}
		$('#area' + dicetotal).hide();
		dicetotal--;
	};


	var rotateCube = function(cubenum, xm, ym, zm, X,Y,Z, rotation, topChange, leftChange, topp, left){

		shaking = true;

		//rotate
		X+=rotation*xm;
		Y+=rotation*ym;
		Z+=rotation*zm;
		X = X % 360;
		Z = Z % 360;
		Y = Y % 360;
		rotation = rotation > 0 ? rotation-0.05 : 0 ;
		$(cubenum).css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		//shift
		if(topp >= height || topp <= -1){
			topChange *= -1;
		}
		if(left >= height || left<=-1){
			leftChange *= -1;
		}
		topp += topChange;
		left += leftChange;
		$(cubenum).css("top", topp + 'px');
		$(cubenum).css("left", left + 'px');

		//continue
		if(rotation > 1.2){
			setTimeout(function(){rotateCube(cubenum,xm,ym,zm, X,Y,Z, rotation, topChange, leftChange, topp, left)}, speed);
		}else{
			posititions[cubenum].topp = topp;
			posititions[cubenum].leftt = left;
			setTimeout(function(){stopCube(cubenum, X,Y,Z, rotation, rotation,rotation)}, speed);
		}
	};

	var stopCube = function(cubenum, X,Y,Z, rX, rY, rZ){
		X+=rX;
		Y+=rY;
		Z+=rZ;
		var curX = X%90;
		var curY = Y%90;
		var curZ = Z%90;
		$(cubenum).css("transform", "rotateX("+X+"deg) rotateY("+Y+"deg) rotateZ("+Z+"deg)");

		if(curY <1 ){
			rY = 0;
		}
		if(curZ <1){
			rZ = 0;
		}
		if(curX <1 ){
			rX = 0;
		}
		if(curX > 1 || curY > 1 || curZ > 1){
			setTimeout(function(){stopCube(cubenum, X,Y,Z, rX, rY, rZ)}, speed);
		}else{
			shaking = false;
		}
	};

	var startShake = function(){
		if(shaking){
			return;
		}
		X = 0;
		Y = 0;
		Z = 0;
		rotation = 6;
		speed = 10;
		randomRotateCube('#cube1');
		randomRotateCube('#cube2');
		randomRotateCube('#cube3');
		randomRotateCube('#cube4');
		randomRotateCube('#cube5');
		randomRotateCube('#cube6');
	};

	var randomRotateCube = function(cubenum){
		var X=0,Y=0,Z=0;
		var rotation = 6;
		var topChange = 1.2*Math.random();
		var leftChange = 1.8*Math.random();

		var ym = 1+ Math.random();
		var zm = 1+ Math.random();
		var xm = 1+ Math.random();
		rotateCube(cubenum, xm, ym, zm, X, Y,Z, rotation, topChange, leftChange, posititions[cubenum].topp, posititions[cubenum].leftt);
	};

	//lets go
	// setTimeout(rotateCube, 1000);
	$('#start').click(startShake);

	window.addEventListener("devicemotion", function(event){
		var x = event.accelerationIncludingGravity.x;
    	var y = event.accelerationIncludingGravity.y;
    	var z = event.accelerationIncludingGravity.z;
    	var threshold = 12;
    	if((x > threshold || y > threshold || z > threshold ) && !shaking){
    		startShake();
    	}
	}, true);

	$('#add').click(addDice);
	$('#minus').click(loseDice);

	
});