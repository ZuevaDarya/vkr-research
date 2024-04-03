import * as THREE from 'three';

export const renderer = new THREE.WebGLRenderer({ canvas });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setClearColor(0xffffff, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.antialias = false;
renderer.setPixelRatio(window.devicePixelRatio * 0.5);
