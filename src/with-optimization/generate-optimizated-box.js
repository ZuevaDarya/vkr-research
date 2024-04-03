import OptimizatedBox from './optimizated-box';

export default function generateOptimizatedBox(numBox, scene) {
  console.time('add objects with optimization');
  const start = window.performance.now();

  const box = new OptimizatedBox();
  box.createOptimizatedBox(numBox);
  scene.add(box.mesh);

  const end = window.performance.now();
  console.timeEnd('add objects with optimization');

  return end - start;
}
