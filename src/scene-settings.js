import { OrbitControls } from 'three/addons/controls/OrbitControls';
import Stats from 'stats.js';
import { scene } from './consts/scene';
import { renderer } from './consts/renderer';
import { camera } from './consts/camera';
import { createDirectionalLight, createHemisphereLight } from './utils/create-lights';
import { GPUStatsPanel } from './utils/gpu-stats-panel';
import { statistic } from './statistic';
import resizeRenderer from './utils/resize-renderer';

const canvas = document.getElementById('canvas');

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const context = renderer.getContext();

const stats = new Stats(context);
document.body.appendChild(stats.domElement);

const gpuStats = new GPUStatsPanel(context);
stats.addPanel(gpuStats);
stats.showPanel(0);

export function render() {

  stats.begin();

  setTimeout(() => {
    requestAnimationFrame(render);
  }, 1000 / 120)

  stats.update();

  gpuStats.startQuery();
  renderer.render(scene, camera);
  gpuStats.endQuery();

  statistic.endFrame(gpuStats.ms);
}

createDirectionalLight(scene);
createHemisphereLight(scene);
render();

window.addEventListener('resize', () => resizeRenderer(camera, canvas, renderer));
