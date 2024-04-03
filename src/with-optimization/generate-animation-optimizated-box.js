import OptimizatedBox from './optimizated-box';
import { createRequestAnimationInstancedMesh } from '../utils/animation';
import { renderer } from '../consts/renderer';
import { camera } from '../consts/camera';

export default function generateAnimationOptimizedBox(numBox, scene) {
  const speed = 0.0005;
  const arr = [];

  console.time('add animation objects with optimization');
  const start = window.performance.now();

  const box = new OptimizatedBox();
  box.createOptimizatedBox(numBox);
  scene.add(box.mesh);

  for (let i = 0; i < numBox; i++) {
    const object = box.matrixes[i];

    const animation = createRequestAnimationInstancedMesh(
      { scene, camera, renderer },
      { mesh: box.mesh, object, idx: i },
      arr,
      speed
    );

    animation();
  }

  const end = window.performance.now()
  console.timeEnd('add animation objects with optimization');

  return {
    arrIds: arr,
    time: end - start,
  };
}

