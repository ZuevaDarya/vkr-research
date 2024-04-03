import Box from './box';
import { createRequestAnimation } from '../utils/animation';
import { renderer } from '../consts/renderer';
import { camera } from '../consts/camera';

export default function generateAnimationBox(numBox, scene) {
  const speed = 0.0005;
  const arr = [];

  console.time('add animation objects without optimization');
  const start = window.performance.now();

  for (let i = 0; i < numBox; i++) {
    const box = new Box(i + 1);
    box.createBox();
    scene.add(box.mesh);

    const animation = createRequestAnimation(
      { scene, camera, renderer },
      box.mesh, arr, speed
    );
    animation();
  }

  const end = window.performance.now()
  console.timeEnd('add animation objects without optimization');

  return {
    arrIds: arr,
    time: end - start,
  };
}

