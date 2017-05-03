function make_pitch(){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 200, 10, 400 );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x000000 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = 0;
        object.position.y = 0 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object

} // end function

function make_net(){
    //alert("make racket")
    for (var i=-9; i<10; i++){

        var geometry = new THREE.CubeGeometry( 5, 2, 2 );

            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
            object.material.ambient = object.material.color;
            //----------------
            object.position.x = i*10;
            object.position.y = 10 ;
            object.position.z = 0;
            //----------------
            object.castShadow = true;
            object.receiveShadow = true;
            //----------------
            scene.add( object );
            objects.push( object );
    }
} // end function

posx = 0

function make_racket(pos_z){
    //alert("make racket")
    var geometry = new THREE.CubeGeometry( 40, 20, 10 );

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = pos_z;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object

} // end function

function make_ball(){
    //alert("make ball")
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffdd99 } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object
} // end function

function make_pong_ball(){
    //alert("make ball")
    var geometry = new THREE.CubeGeometry( 10, 10, 10 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xffffff } ) );
        object.material.ambient = object.material.color;
        //----------------
        object.position.x = posx;
        object.position.y = 20 ;
        object.position.z = 0;
        //----------------
        object.castShadow = true;
        object.receiveShadow = true;
        //----------------
        scene.add( object );
        objects.push( object );
        return object
} // end function

// function make_score(){
//     alert("make counter")
    
//     var list_numb = [[0,0,0],[0,10,0],[0,20,0]];
//     // for (i in list_numb){
//     //     var pos = list_numb[i]
//     //     // alert(pos[0])

//     //     var geometry = new THREE.CubeGeometry(10,10,10);
//     //     var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({color: 0xffffff}) );
//     //     object.material.ambient = object.material.color;
//     // //     //----------------
//     //     // object.position.x = pos[0];
//     //     // object.position.y = pos[1] ;
//     //     // object.position.z = pos[2];
//     // //     //----------------
//     // //     object.castShadow = true;
//     // //     object.receiveShadow = true;
//     // //     //----------------
//     // //     scene.add( object );
//     // } // end for

// } // end function



