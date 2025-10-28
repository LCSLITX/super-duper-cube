import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lilgui from 'lil-gui'


// CONSTANTS
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


// DEBUG
const guy = new lilgui.GUI();


// CONTROLS
const controls = {
  Wireframe: true,
  Color: new THREE.Color(0xff0000),
}
// add controls to the debug UI.
guy.add(controls, 'Wireframe');
guy.addColor(controls, 'Color').onFinishChange();


// LISTENERS
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
})


// CANVAS
const canvas = document.querySelector('canvas.webgl')

// SCENE
const scene = new THREE.Scene()


// GEOMETRY
// Geometry represents the vertex data of some 
// 'object' like a sphere, cube, plane, dog, cat,
// human, tree, building, etc.
const geometry = new THREE.BoxGeometry(1, 1, 1)

// MATERIAL
// Material represents the surface properties used to
// draw geometry, including things like color and
// how shiny it is. A material can also reference
// one or more Texture.
const material = new THREE.MeshBasicMaterial({ color: controls.Color })

// MESH
// A mesh is composed by a geometry and a material.
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Add orbit controls capabilities to the camera.
const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true


// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// clocks are a THREE class to natively allow some capabilities.
// const clock = new THREE.Clock()
const animate = () =>
{
    // const elapsedTime = clock.getElapsedTime()
    material.wireframe = controls.Wireframe;
    material.color = controls.Color;

    orbitControls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}

animate();