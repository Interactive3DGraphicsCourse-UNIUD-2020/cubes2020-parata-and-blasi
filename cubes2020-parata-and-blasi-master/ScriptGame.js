

var scene, camera, renderer, controls, stats;

//return array with height data from img, taken from: http://danni-three.blogspot.it/2013/09/threejs-heightmaps.html
function getHeightData(img,scale) {

    if (scale == undefined) scale=1;

    var canvas = document.createElement( 'canvas' );
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext( '2d' );

    var size = img.width * img.height;
    console.log(size);
    var data = new Float32Array( size );

    context.drawImage(img,0,0);

    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j=0;
    for (var i = 0; i<pix.length; i +=4) {
        var all = pix[i]+pix[i+1]+pix[i+2];  // all is in range 0 - 255*3
        data[j++] = scale*all/3;   
    }

    return data;
}

function Start() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xf0f0f0 );
    //document.body.appendChild( renderer.domElement );

    document.getElementById("Prova").appendChild( renderer.domElement );
    
    camera.position.set(3,4,6);
    camera.lookAt( new THREE.Vector3(0,0,0));
    
    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
    var cube = new THREE.Mesh( geometry, material );
    
    scene.add( cube );
    
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
    
    // uncomment if you need to draw coordinate axes when building the scene
    //Coordinates.drawAllAxes();
    
    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', Render );
    
    // terrain
    var img = new Image();
    img.onload = function () {

        //get height data from img
        var data = getHeightData(img,0.1);

        // load img source
        img.src = "textures/heightmap2.png";
    }
    
    
}

function Update() {
    requestAnimationFrame( Update );
    controls.update();  
    stats.update();
    Render();
}

function Render() {
    
    renderer.render(scene, camera);
}

Start();
Update();