import * as THREE from 'three';

export default class Box {
  constructor(idx = 1, h = 50, w = 50, d = 50, rgb = [], position = [], rotation = []) {
    this.height = h;
    this.width = w;
    this.depth = d;
    this.idx = idx;

    if (rgb.length !== 0) {
      const [rVal, gVal, bVal] = rgb;
      this.rgb = `rgb(${rVal}, ${gVal}, ${bVal})`
    } else {
      const rVal = Math.floor(Math.random() * 255);
      const gVal = Math.floor(Math.random() * 255);
      const bVal = Math.floor(Math.random() * 255);
      this.rgb = `rgb(${rVal}, ${gVal}, ${bVal})`;
    }

    if (position.length !== 0) {
      this.position = position;
    } else {
      const x = (Math.random() - 0.5) * 2500;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 3000;
      this.position = [x, y, z];
    }

    if (rotation.length !== 0) {
      this.rotation = rotation;
    } else {
      const x = Math.random();
      const y = Math.random();
      const z = Math.random();
      this.rotation = [x, y, z];
    }

    this.mesh = null;
  }

  createBox() {
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth, 10, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: this.rgb, transparent: true, opacity: 1 });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.name = 'Box' + this.idx;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.geometry.castShadow = true;
    this.mesh.geometry.receiveShadow = true;
    this.mesh.position.x = this.position[0];
    this.mesh.position.y = this.position[1];
    this.mesh.position.z = this.position[2];
    this.mesh.rotation.x = this.rotation[0];
    this.mesh.rotation.y = this.rotation[1];
    this.mesh.rotation.z = this.rotation[2];
  }
}
