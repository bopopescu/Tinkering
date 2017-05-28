function make_board(){
    //alert("in make_board")
    var size_square = 150;
    var geometry = new THREE.CubeGeometry( size_square, size_square, 5 );
    var square_color
    for ( var i = 0; i < 64; i ++ ) {
        if ((i+Math.floor(i/8))%2==0){square_color = 0x000000}
        else{square_color = 0xffffff}
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (i%8-4) * size_square
        object.position.y = (Math.floor(i/8)-4) * size_square
        object.position.z = 0
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        // objects.push( object );
    }
} // end function

function make_pawns(){
    //alert("in make_pawns")
    var size_square = 150;
    var size_pawns = 50;
    var geometry = new THREE.CubeGeometry( size_pawns, size_pawns, size_pawns );
    var square_color;
    for ( var i = 0; i < 16; i ++ ) {
        if (Math.floor(i/8)%2==0){
            square_color = 0x800000
            var posy = 1
           }
        else{
            square_color = 0xf0f0f5
            var posy = 6
           }
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (i%8-4) * size_square
        object.position.y = (posy-4) * size_square
        object.position.z = size_pawns/2
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    } // end for
} // end function

function make_towers(){
    var size_square = 150;
    var size_towers = 100;
    var geometry = new THREE.CylinderGeometry(  50, 25, size_towers);
    var square_color;
    //pos_towers = [-650]
    for ( var i = 0; i < 4; i ++ ) {
        if (Math.floor(i/2)%2==0){
            square_color = 0x800000
            var posy = 0
           }
        else{
            square_color = 0xf0f0f5
            var posy = 7
           }
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: square_color } ) );
        object.material.ambient = object.material.color;
        object.position.x = (Math.pow(-1, i%2)*3.5-0.5)* size_square
        alert(object.position.x)
        object.position.y = (posy-4) * size_square
        object.position.z = size_towers/2
        object.rotation.x = -Math.PI/2
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    } // end for
} // end function


