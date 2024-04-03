import * as THREE from 'three';

export function createHemisphereLight(scene) {
  const skyColor = 0xB1E1FF;
  const groundColor = 0xB97A20;
  const intensity = 0.6;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

  light.name = 'HemisphereLight';
  scene.add(light);
}

export function createDirectionalLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 0.8;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);

  light.castShadow = true;
  light.shadow.camera.near = 100;

  light.name = 'DirectionalLight';
  scene.add(light);
  scene.add(light.target);
}
