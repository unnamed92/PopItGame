window.onload = function() {

	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	var score = document.getElementById('score');
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var choosenPos = getSquare();
	var choosenSpeed = getSpeed();
	var currentPos = 0;
	var stoping = null;
	var canvasLeft = canvas.offsetLeft;
	var canvasTop = canvas.offsetTop;
	var elements = [];
	var points = 0;

	function getSquare() {
	  var pos = Math.floor(Math.random() * (640 - 1) + 1);
	  return pos;
	  }


	function getSpeed() {
	  var speed = Math.floor(Math.random() * (5 - 3) + 3);
	  return speed;
	  }


	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.round(Math.random() * 15)];
	    }
	    return color;
	}


	
	function animate() {  
	  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth); 
	  ctx.fillRect(choosenPos, currentPos, 20, 20);
	  currentPos += choosenSpeed;
	  if(currentPos >= canvas.height) {
		    currentPos = 0;
		    choosenSpeed = getSpeed();
		    choosenPos = getSquare();
		    ctx.fillStyle= getRandomColor();
	  }
	  stoping = requestAnimationFrame(animate);
	}

	start.onclick = function() {
		score.innerHTML = '0 points'
	};

	start.addEventListener('click', animate);
	
	stop.addEventListener('click', function() {
		cancelAnimationFrame(stoping);
		ctx.clearRect(0, 0, 640, 480);
	});

	canvas.addEventListener('click', function(event) {
		elements.push({
	  	left: choosenPos,
	  	top: currentPos,
	  	width: 20,
	  	height: 20
	  });
		var x = event.pageX - canvasLeft;
		var y = event.pageY - canvasTop;
		elements.forEach(function(element) {
			if(y > element.top && y < element.top + element.height && 
				x > element.left && x < element.left + element.width) {
					points++;
					ctx.fillStyle="yellow";
					score.innerHTML = points + " points";
			}
		});
	}, false);


};