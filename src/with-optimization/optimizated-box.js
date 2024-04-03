import * as THREE from 'three';

export default class OptimizatedBox {
  constructor(h = 50, w = 50, d = 50) {
    this.height = h;
    this.width = w;
    this.depth = d;
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth, 10, 10, 10);
    this.material = new THREE.MeshLambertMaterial({ color: this.generateColors(), transparent: true, opacity: 1 });
    this.matrixes = [];
  }

  createOptimizatedBox(count) {
    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, count);

    const x = 2500;
    const y = 2000;
    const z = 3000;

    for (let i = 0; i < count; i++) {
      const dummy = new THREE.Object3D();
      const color = this.generateColors();

      this.mesh.setColorAt(i, new THREE.Color(color));

      dummy.position.set(Math.random() * x, Math.random() * y, Math.random() * z);
      dummy.rotation.x = 2 * Math.PI * Math.random();
      dummy.rotation.y = 2 * Math.PI * Math.random();
      dummy.rotation.z = 2 * Math.PI * Math.random();
      dummy.updateMatrix();

      this.mesh.setMatrixAt(i, dummy.matrix);
      this.matrixes.push(dummy);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  generateColors() {
    let h, s, l;
    let min_s = 30, max_s = 100;
    let min_l = 50, max_l = 100;

    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * (max_s - min_s) + min_s);
    l = Math.floor(Math.random() * (max_l - min_l) + min_l);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }
}
