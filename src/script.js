import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { BoxBufferGeometry, MeshBasicMaterial } from 'three';

// class MainWorld {
//   constructor() {
//     this.init()
//   }

//   init() {

//   }

//   createCamera() {

//   }

//   createRenderer() {

//   }

//   render() {

//   }

// }

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const plane = new THREE.PlaneBufferGeometry(50, 120, 2, 5);
const plane2 = new THREE.PlaneBufferGeometry(30, 120, 1, 1);
const plane3 = new THREE.PlaneBufferGeometry(30, 120, 1, 1);
const plane4 = new THREE.PlaneBufferGeometry(90, 30, 1, 1);
const plane5 = new THREE.PlaneBufferGeometry(90, 30, 1, 1);
// const box = new THREE.BoxBufferGeometry(1, 1, 1)

// Materials
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
const planeMaterial = new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide })

// Mesh
const planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.name = 'mandi'
scene.add(planeMesh)
const planeMesh2 = new THREE.Mesh(plane2, planeMaterial)
planeMesh2.name = 'mandi'
scene.add(planeMesh2)
const planeMesh3 = new THREE.Mesh(plane3, planeMaterial)
planeMesh3.name = 'mandi'
scene.add(planeMesh3)
const planeMesh4 = new THREE.Mesh(plane4, planeMaterial)
planeMesh4.name = 'mandi'
scene.add(planeMesh4)
const planeMesh5 = new THREE.Mesh(plane5, planeMaterial)
planeMesh5.name = 'mandi'
scene.add(planeMesh5)
planeMesh2.position.set(30, 0, 0)
planeMesh3.position.set(-30, 0, 0)
planeMesh4.position.set(0, 0, 70)
planeMesh5.position.set(0, 0, -70)
planeMesh.rotateX( - Math.PI / 2);
planeMesh2.rotateX( - Math.PI / 2);
planeMesh3.rotateX( - Math.PI / 2);
planeMesh4.rotateX( - Math.PI / 2);
planeMesh5.rotateX( - Math.PI / 2);
// pile geometry
const pileGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1);
const pileMaterial = new THREE.MeshBasicMaterial({ color: 0x00000 });

// const planePosition = planeMesh.vertices
const verticesValue = planeMesh.geometry.attributes.position.count
// plane.attributes.position[0]

const loader = new GLTFLoader();

loader.load('newBooth.glb', function ( gltf ) {
  console.log(renderer.info.render)
  for(let i = 0; i < verticesValue; i++) {
    const x = planeMesh.geometry.attributes.position.getX(i);
    const y = planeMesh.geometry.attributes.position.getY(i);
    const model = gltf.scene.clone()
    scene.add(model)
    // const pileMesh = new THREE.Mesh(pileGeometry, pileMaterial)
    // scene.add(pileMesh)
    model.position.x = x
    model.position.z = y
    model.position.y = 0.2
    model.rotation.y = 600
    // pileMesh.position.y = 10
    // pileMesh.position.x = x
    // pileMesh.position.z = y
    // pileMesh.name = 'box'
  }

  // gui.add(model.rotation, 'y', 0, 360)

}, undefined, function ( error ) {

	console.log( error );

} )

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onClick( event ) {

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children, true );

  let coordinates;
  if(intersects.length > 0 && intersects[0].object.name !== 'mandi') {
    coordinates = intersects[0].point;
    // console.log(intersects[0])
    gsap.to(camera.position, {
      x: coordinates.x,
      y: 10,
      z: coordinates.z,
      duration: 1
    })
    // camera.lookAt(coordinates.x, coordinates.y, coordinates.z)
  }

}

window.addEventListener( 'click', onClick );

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff);
// scene.add(pointLight)
// const rectLight = new THREE.RectAreaLight(0xfffffff, 1, 10, 30);
// const helper = new RectAreaLightHelper(rectLight)
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
scene.add(hemiLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
});


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.y = 15;
camera.position.z = 90;
scene.add(camera);


// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

console.log(renderer.info.render)

const color = new THREE.Color('skyblue')
scene.background = color;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
console.log(renderer.info.render.calls)


/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  
  const elapsedTime = clock.getElapsedTime();  

  // Update objects
  // sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
