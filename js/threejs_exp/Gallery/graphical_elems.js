function tableau(txt, size,  x, z, y, roty){
    // on créé un  plan pour lequel on définit un matériau puis on l’ajoute à la scène
    var geom = new THREE.PlaneGeometry( size, size, 2);
    var mat= new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(txt), overdraw: true } );
    var tabl = new THREE.Mesh( geom, mat); // , new THREE.SphericalReflectionMapping()

    tabl.position.x = +x;
    tabl.position.z = +z;
    tabl.rotation.y += roty;
    tabl.position.y = y; //hauteur
    scene.add(tabl);
}