import * as THREE from "https://unpkg.com/three@0.183.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.183.1/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "https://unpkg.com/three@0.183.1/examples/jsm/loaders/STLLoader.js";

const app = document.getElementById("app");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d131c);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(220, 140, 220);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 20, 0);

scene.add(new THREE.HemisphereLight(0x9fc5ff, 0x243042, 0.9));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
keyLight.position.set(140, 180, 100);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x7fb3ff, 0.45);
rimLight.position.set(-120, 80, -100);
scene.add(rimLight);

const grid = new THREE.GridHelper(500, 20, 0x516278, 0x2a3442);
grid.position.y = -0.01;
scene.add(grid);

const loader = new STLLoader();
loader.load(
  "/R2_BaseLink.STL",
  (geometry) => {
    geometry.computeVertexNormals();
    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xbfc8d8,
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35
    });

    const mesh = new THREE.Mesh(geometry, material);

    const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 120;
    const uniformScale = targetSize / maxDimension;
    mesh.scale.setScalar(uniformScale);

    scene.add(mesh);
    controls.target.set(0, 0, 0);
  },
  undefined,
  (error) => {
    console.error("Failed to load STL", error);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
