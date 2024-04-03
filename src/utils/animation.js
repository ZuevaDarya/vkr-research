function rotate(obj, speed) {
  obj.rotation.x += 180 / Math.PI * speed;
  obj.rotation.y += 180 / Math.PI * speed;
  obj.rotation.z += 180 / Math.PI * speed;
}

export function createRequestAnimation(settings, mesh, arr, speed) {
  const { scene, camera, renderer } = settings;
  
  return function animation() {
    const id = requestAnimationFrame(animation);
    arr.push(id);
    rotate(mesh, speed);
    renderer.render(scene, camera);
  }
}

export function createRequestAnimationInstancedMesh(settings, data, arr, speed) {
  const { scene, camera, renderer } = settings;
  const { mesh, object, idx } = data;

  return function animation() {
    const id = requestAnimationFrame(animation);
    arr.push(id);
  
    rotate(object, speed);
    object.updateMatrix();
  
    mesh.setMatrixAt(idx, object.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  
    renderer.render(scene, camera);
  }
}

