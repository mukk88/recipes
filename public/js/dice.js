//todo make shaking local

$(document).ready(function(){
	var speed = 10;
	var shaking = false;
	var height = 200;
	var pos = {};
	var dicetotal = 2;

	for(var i=3;i<7;i++){
		$('#area' + i).hide();
	}

	for(var i=1;i<7;i++){
		pos["#cube" + i] = {};
		pos['#cube' + i].topp = 100;
		pos['#cube' + i].leftt = 100;
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

	var rotateCube = function(data, topp, left){

		shaking = true;

		//rotate
		data.X+=data.rotation*data.xm;
		data.Y+=data.rotation*data.ym;
		data.Z+=data.rotation*data.zm;
		data.X = data.X % 360;
		data.Z = data.Z % 360;
		data.Y = data.Y % 360;
		data.rotation = data.rotation > 0 ? data.rotation-0.05 : 0 ;
		$(data.cubenum).css("transform", "rotateX("+data.X+"deg) rotateY("+data.Y+"deg) rotateZ("+data.Z+"deg)");

		//shift
		if(topp >= height || topp <= -1){
			data.topChange *= -1;
		}
		if(left >= height || left<=-1){
			data.leftChange *= -1;
		}
		topp += data.topChange;
		left += data.leftChange;
		$(data.cubenum).css("top", topp + 'px');
		$(data.cubenum).css("left", left + 'px');

		//continue
		if(data.rotation > 1.2){
			setTimeout(function(){rotateCube(data, topp, left)}, speed);
		}else{
			var stopCubeData = {};
			stopCubeData.cubenum = data.cubenum;
			stopCubeData.X = data.X;
			stopCubeData.Y = data.Y;
			stopCubeData.Z = data.Z;
			stopCubeData.rX = data.rotation;
			stopCubeData.rY = data.rotation;
			stopCubeData.rZ = data.rotation;
			pos[data.cubenum].topp = topp;
			pos[data.cubenum].leftt = left;
			setTimeout(function(){stopCube(stopCubeData)}, speed);
		}
	};

	var stopCube = function(data){
		data.X+=data.rX;
		data.Y+=data.rY;
		data.Z+=data.rZ;
		var curX = data.X%90;
		var curY = data.Y%90;
		var curZ = data.Z%90;
		$(data.cubenum).css("transform", "rotateX("+data.X+"deg) rotateY("+data.Y+"deg) rotateZ("+data.Z+"deg)");

		if(curY <1 ){
			data.rY = 0;
		}
		if(curZ <1){
			data.rZ = 0;
		}
		if(curX <1 ){
			data.rX = 0;
		}
		if(curX > 1 || curY > 1 || curZ > 1){
			setTimeout(function(){stopCube(data)}, speed);
		}else{
			shaking = false;
		};
	};

	var startShake = function(){
		if(shaking){
			return;
		}
		X = 0;
		Y = 0;
		Z = 0;
		rotation = 8;
		speed = 10;
		randomRotateCube('#cube1');
		randomRotateCube('#cube2');
		randomRotateCube('#cube3');
		randomRotateCube('#cube4');
		randomRotateCube('#cube5');
		randomRotateCube('#cube6');
	};

	var randomRotateCube = function(cubenum){
		var rotationCubeData = {};
		rotationCubeData.X = 0;
		rotationCubeData.Y = 0;
		rotationCubeData.Z = 0;
		rotationCubeData.rotation = 6;
		rotationCubeData.topChange = 1.2* Math.random();
		rotationCubeData.leftChange = 1.8*Math.random();
		rotationCubeData.ym = 1 + Math.random();
		rotationCubeData.xm = 1 + Math.random();
		rotationCubeData.zm = 1 + Math.random();
		rotationCubeData.cubenum = cubenum;

		rotateCube(rotationCubeData, pos[cubenum].topp, pos[cubenum].leftt);
	};


	window.addEventListener("devicemotion", function(event){
		var x = event.accelerationIncludingGravity.x;
    	var y = event.accelerationIncludingGravity.y;
    	var z = event.accelerationIncludingGravity.z;
    	var threshold = 12;
    	if((x > threshold || y > threshold || z > threshold ) && !shaking){
    		startShake();
    	}
	}, true);

	$('#start').click(startShake);
	$('#add').click(addDice);
	$('#minus').click(loseDice);
});