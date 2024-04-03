import * as THREE from 'three';
import { scene } from './consts/scene';
import generateAnimationBox from './not-optimization/generate-animation-box';
import generateBox from './not-optimization/generate-box';
import { statistic } from './statistic';
import clearResults from './utils/clear-results';
import showResults from './utils/show-results';
import generateAnimationOptimizedBox from './with-optimization/generate-animation-optimizated-box';
import generateOptimizatedBox from './with-optimization/generate-optimizated-box';
import sleep from './utils/sleep';
import removeTextAndClass from './utils/remove-text-and-class';
import addTextAndClass from './utils/add-text-and-class';
import exportCSV from './utils/export-csv';
import writeStatisticData from './utils/write-statistic-data';
import getTestMessage from './utils/get-test-message';

const addObjectsBtn = document.querySelector('#addObjectsBtn');
const numObjectsInput = document.querySelector('#numObjectsInput');
const clearBtn = document.querySelector('#clearBtn');
const animationCheckbox = document.querySelector('#animationCheckbox');
const numIterationInput = document.querySelector('#numIteration');
const startTestBtn = document.querySelector('#startTest');
const testMessage = document.querySelector('#message');
const optimizationCheckbox = document.querySelector('#optimizationCheckbox');
const clearResultsBtn = document.querySelector('#clearResultsBtn');
const exportTableBtn = document.querySelector('#exportTableBtn');

let arrIds = [];
let needShow = true;
let isOptimizated = false;
let isAnimate = false;

function clearScene() {
  let children = scene.children;

  for (let i = children.length - 1; i >= 0; i--) {
    const isLight =
      children[i] instanceof THREE.HemisphereLight ||
      children[i] instanceof THREE.DirectionalLight;

    const isCamera = children[i] instanceof THREE.PerspectiveCamera;

    if (arrIds.length !== 0) {
      arrIds.map(id => cancelAnimationFrame(id));
      arrIds.length = 0;
    }

    if (children[i] instanceof THREE.Mesh && !isLight && !isCamera) {
      children[i].geometry.dispose();
      children[i].material.dispose();
      scene.remove(children[i]);
    }
  }
}

function addObjects() {
  clearScene();

  const numObj = Number(numObjectsInput.value);
  let time = 0;
  let message = '';

  if (!animationCheckbox.checked) {
    isAnimate = false;

    if (!optimizationCheckbox.checked) {
      time = generateBox(numObj, scene);
      writeStatisticData(statistic, time, numObj);
      
      message = `добавить объекты (${numObj}) без оптимизации`;
      isOptimizated = false;
    } else {
      time = generateOptimizatedBox(numObj, scene);
      writeStatisticData(statistic, time, numObj);
    
      message = `добавить объекты (${numObj}) с оптимизацией`;
      isOptimizated = true;
    }
  } else {
    isAnimate = true;

    if (!optimizationCheckbox.checked) {
      const animationData = generateAnimationBox(numObj, scene);
      time = animationData.time;
      arrIds = animationData.arrIds;
      writeStatisticData(statistic, time, numObj);

      message = `добавить объекты (${numObj}) с анимацией без оптимизации`;
      isOptimizated = false;
    } else {
      const animationData = generateAnimationOptimizedBox(numObj, scene);
      time = animationData.time;
      arrIds = animationData.arrIds;
      writeStatisticData(statistic, time, numObj);

      message = `добавить объекты (${numObj}) с анимацией с оптимизацией`;
      isOptimizated = true;
    }
  }

  if (needShow) {
    showResults(message, time, 'ms');
  }

  return message;
}

async function startTest() {
  needShow = false;
  statistic.resetStatisticState();

  const numIteration = Number(numIterationInput.value);
  let message = '';

  for (let i = 0; i < numIteration; i++) {
    addTextAndClass(testMessage, `выполняются тесты, итерация ${i + 1} из ${numIteration}`);
    message = addObjects();
    statistic.setIterationNum(i);
    await sleep(5000);
  }

  addTextAndClass(testMessage, 'тесты выполнены успешно', 'message_success');

  const mean = statistic.getMeanCodeExecutionTime();
  const fpsMean = statistic.getMeanFPS();
  const gpuMean = statistic.getMeanGPU();
  const { fpsMessage, gpuMessage } = getTestMessage(isOptimizated);

  showResults(`${message} (среднее время)`, mean, 'ms');
  showResults(`${fpsMessage} (среднее)`, fpsMean, 'кадр/сек');
  showResults(`${gpuMessage} (среднее)`, gpuMean, 'ms');

  needShow = true;
}

clearBtn.addEventListener('click', () => {
  clearScene();
});
addObjectsBtn.addEventListener('click', () => addObjects());
startTestBtn.addEventListener('click', () => {
  removeTextAndClass(testMessage, 'message_success');
  startTest();
});
clearResultsBtn.addEventListener('click', () => {
  removeTextAndClass(testMessage, 'message_success');
  clearResults();
  statistic.resetStatisticState();
});
exportTableBtn.addEventListener('click', () => exportCSV(statistic, isOptimizated, isAnimate));


