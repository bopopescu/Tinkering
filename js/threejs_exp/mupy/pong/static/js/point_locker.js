var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var velocity_ball = new THREE.Vector3();
var speed_ball = 180
var angle_ball = 0
velocity_ball.z = speed_ball;
velocity_ball.x = 0;
debug = 0

//alert('Helllooo welcome in point_locker.js !!!! ')

THREE.PointerLockControls = function ( camera ) {
    //alert('Helllooo welcome in PointerLockControls !!!! ')
	var scope = this;
	camera.rotation.set( 0, 0, 0 );
	var pitchObject = new THREE.Object3D();
	pitchObject.add(camera);
	var yawObject = new THREE.Object3D();
	yawObject.position.y = 10;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;

	var onMouseMove = function ( event ) {
		//------------------
		if ( scope.enabled === false ) return;
		//------------------
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		//------------------
		yawObject.rotation.y -= movementX * 0.008; //0.002
		pitchObject.rotation.x -= movementY * 0.008; //0.002
		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.dispose = function() {
		document.removeEventListener( 'mousemove', onMouseMove, false );
	};

	document.addEventListener( 'mousemove', onMouseMove, false );
	this.enabled = false;
	this.getObject = function () {
		return yawObject;
	};

	this.getDirection = function() {
		// assumes the camera itself is not rotated
		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
		return function( v ) {
			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
			v.copy( direction ).applyEuler( rotation );
			return v;
		};
	}();
};

var posy = 150

function init() {
    //alert('Helllooo welcome in init !!!! ')
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );
    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 80: // P
			    for (i=0;i<list_score.length;i++){
					scene.remove(list_score[i])
				}
                break;

			// case 77: // M
			// 	camera.position.set( 0, 50, 120 );
			// 	controls.update();

            case 38: // up
            case 90: // z
                moveForward = true;
                break;

            case 37: // left
                moveLeft = true;
				break;

            case 40: // down
			case 68: // D
                moveBackward = true;
                break;

            case 39: // right
                moveRight = true;
                break;

			case 65: // A
				posy += 5;
				break;

			case 83: // S
				posy += -5;
				break;

            case 32: // space
                if ( canJump === true ) controls.getObject().translateY(100); // velocity.y += 1000;  // jump

                canJump = false;
                break;
        }
    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 90: // z
                moveForward = false;
                break;

            case 37: // left
                moveLeft = false;
                break;

            case 40: // down
			case 68: // d
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	var canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer();
	// canvas.width  = canvas.clientWidth;
	// canvas.height = canvas.clientHeight;
	// renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
	//canvas.appendChild( renderer.domElement );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

}

function zreflection(zsign){
	angle_ball = Math.atan2(Math.abs(velocity_ball.x),Math.abs(velocity_ball.z))
	sign = Math.sign(velocity_ball.x)
	velocity_ball.x = sign*speed_ball*Math.abs(Math.sin(angle_ball))
	velocity_ball.z = zsign*speed_ball*Math.cos(angle_ball)
}

function xreflection(xsign){
	angle_ball = Math.atan2(Math.abs(velocity_ball.x),Math.abs(velocity_ball.z))
	sign = Math.sign(velocity_ball.z)
	velocity_ball.x = xsign*speed_ball*Math.abs(Math.sin(angle_ball))
	velocity_ball.z = sign*speed_ball*Math.cos(angle_ball)
}

function make_pong(){
	var mySound = soundManager.createSound({
    url: '/static/sounds/pong.wav'
    });
    mySound.play();
}


function make_new_score(){
	for (i=0;i<list_score.length;i++){
		scene.remove(list_score[i])
	}

	make_score(1,score[1])
	make_score(2,score[0])
}

function animate() {
	//alert('Helllooo welcome in animate !!!! ')
    requestAnimationFrame( animate );

    if ( controlsEnabled ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );
        var isOnObject = intersections.length > 0;
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 1.0 * delta;                 // velocity x
        velocity.z -= velocity.z * 1.0 * delta;                 // velocity z
        // velocity.y = 0;
        velocity.y -= 9.8 * 10.0 * delta; // 100.0 = mass       // velocity y  taking in account the gravity.

		var horiz_speed = 180.0                                  // Horizontal speed
		var vert_speed = 40.0                                   // Vertical speed
        if ( moveForward ) velocity.z -= horiz_speed * delta;
        if ( moveBackward ) velocity.z += horiz_speed * delta;
        if ( moveLeft ) velocity.x -= horiz_speed * delta;
        if ( moveRight ) velocity.x += horiz_speed * delta;

        if ( isOnObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta ); // velocity.y * delta
        controls.getObject().translateZ( velocity.z * delta );

		racket1.position.x += velocity_racket1.x * delta
		//console.log('########## the speed is ' + velocity_racket1.x)
        if (delta<0.1){ 										 // avoiding going out of the pitch at the beginning of the game.
			ball.position.z += velocity_ball.z * delta           // ball position main axis
			ball.position.x += velocity_ball.x * delta           // ball position lateral axis
		}

		// list_ball_position.push(ball.position.z)
		if (debug>0){
			socket.emit('message',  JSON.stringify(ball.position.z)) // "hellloooooo"
			socket.emit('message',  JSON.stringify(delta))
			var geometry = new THREE.CubeGeometry( 2, 2, 2 );
				var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) );
				object.material.ambient = object.material.color;
				//----------------
				object.position.x = ball.position.x;
				object.position.y = ball.position.y ;
				object.position.z = ball.position.z;
				//----------------
				object.castShadow = true;
				object.receiveShadow = true;
				//----------------
				scene.add( object );
				//alert(object.position.z)
		}

		if (ball.position.z < -200){                         // inferior limit and rebouncing
			var diff = racket1.position.x-ball.position.x
			var dist = Math.abs(diff)
			// console.log('############################ dist is ' + dist)
		    if (dist < 30){
				sign = 1
				if (velocity_ball.x != 0){
					sign = Math.sign(velocity_ball.x)
				}
				// Sending back the ball with different angle
				angle_ball = dist/30* Math.PI/2
				velocity_ball.x = sign*speed_ball*Math.abs(Math.sin(angle_ball))
				velocity_ball.z = speed_ball*Math.cos(angle_ball)
				make_pong()
			}
			else{
				//angle_ball = Math.atan2(velocity_ball.x,velocity_ball.z)
				zreflection(1)
				score[0] += 1
				make_new_score()
				//make_score(2,score[1])
			};
		} // end if
		if (ball.position.z > 200){         // superior limit and rebouncing
			zreflection(-1)
			make_pong()
		}
		if (ball.position.x > 100){
			  //velocity_ball.x *= -1;
			  xreflection(-1)
			}

		if (ball.position.x < -100){
			  //velocity_ball.x *= -1;
			  xreflection(1)
			}

        if ( controls.getObject().position.y < posy ) {
            velocity.y = 0;
            controls.getObject().position.y = posy;
            canJump = true;
        }
        prevTime = time;
    }
    renderer.render( scene, camera );
}

function ptlock() {
	    //alert('Helllooo welcome in ptlock !!!! ')
		var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
		if ( havePointerLock ) {
			var element = document.body;
			var pointerlockchange = function ( event ) {
				if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
					controlsEnabled = true;
					controls.enabled = true;
					blocker.style.display = 'none';

				} else {

					controls.enabled = false;
					blocker.style.display = '-webkit-box';
					blocker.style.display = '-moz-box';
					blocker.style.display = 'box';
					instructions.style.display = '';
				}
			};

			var pointerlockerror = function ( event ) {
				instructions.style.display = '';
			};

			// Hook pointer lock state change events
			document.addEventListener( 'pointerlockchange', pointerlockchange, false );
			document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
			document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
			document.addEventListener( 'pointerlockerror', pointerlockerror, false );
			document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
			document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

			instructions.addEventListener( 'click', function ( event ) {
				//alert('just clicked !!! ')
				instructions.style.display = 'none';
				// Ask the browser to lock the pointer
				element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

				if ( /Firefox/i.test( navigator.userAgent ) ) {

					var fullscreenchange = function ( event ) {
						if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
							document.removeEventListener( 'fullscreenchange', fullscreenchange );
							document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
							element.requestPointerLock();
						}
					};

					document.addEventListener( 'fullscreenchange', fullscreenchange, false );
					document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
					element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
					element.requestFullscreen();
				} else {
					element.requestPointerLock();
				}
			}, false );

		} else {

			instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
		}
}