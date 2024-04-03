import Box from './box';

export default function generateBox(numBox, scene) {
  console.time('add objects without optimization');
  const start = window.performance.now();

  for (let i = 0; i < numBox; i++) {
    let box = new Box(i + 1);
    box.createBox();
    scene.add(box.mesh);
  }

  const end = window.performance.now();
  console.timeEnd('add objects without optimization');

  return end - start;
}
