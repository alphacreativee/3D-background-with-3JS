import * as THREE from "https://unpkg.com/three@0.137.5/build/three.module.js";
const container = document.querySelector(".three_bg");

const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// WebGLRenderer: Đây là renderer sử dụng WebGL để vẽ cảnh 3D lên màn hình
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);
//Khởi tạo Hình học (Geometry) và Vật liệu (Material)
const imageUrl = "./images/img2.png";
const geometry = new THREE.PlaneGeometry(20, 8, 21, 9);
const material = new THREE.MeshBasicMaterial({
  map: loader.load(imageUrl),
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 5;

// xét thời gian
const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);

    const animation1 = 0.3 * Math.sin(x + time * 0.75);
    geometry.attributes.position.setZ(i, animation1);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
