import * as THREE from 'three';
import { scene } from './scene';

export const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 50000);
camera.position.set(2000, 2000, 1000);
camera.lookAt(scene.position);

