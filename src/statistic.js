export class Statistic {
  constructor() {
    this.iterationNum = -1;
    this.fpsStats = [];
    this.prevTime = performance.now();
    this.frames = 0;
    this.codeExecutionTime = [];
    this.gpuStats = [];
    this.numObjects = 0;
  }

  addFPS(fps) {
    if (this.iterationNum === -1) {
      return;
    }

    if (this.fpsStats.length <= this.iterationNum) {
      this.fpsStats.push([]);
    }

    this.fpsStats[this.iterationNum].push(fps);
  }

  getFPS(iterationNum) {
    return this.fpsStats[iterationNum];
  }

  addGPU(gpu) {
    if (this.iterationNum === -1) {
      return;
    }

    if (this.gpuStats.length <= this.iterationNum) {
      this.gpuStats.push([]);
    }

    this.gpuStats[this.iterationNum].push(gpu);
  }

  getGPU(iterationNum) {
    return this.gpuStats[iterationNum];
  }

  setIterationNum(iterationNum) {
    this.iterationNum = iterationNum;
  }

  endFrame(gpu) {
    this.frames++;

    let time = performance.now();
    if (time > this.prevTime + 1000) {
      let fps = Math.round((this.frames * 1000) / (time - this.prevTime));

      this.addFPS(fps);
      this.addGPU(gpu);

      this.frames = 0;
      this.prevTime = time;
    }
  }

  addTime(time) {
    this.codeExecutionTime.push(Number(time));
  }

  calculateMean(arrValues) {
    if (arrValues.length !== 0) {
      let sum = arrValues.reduce((a, b) => a + b, 0);
      let mean = sum / arrValues.length;

      return mean;
    } else {
      return 0;
    }
  }

  getMeanCodeExecutionTime() {
    return this.calculateMean(this.codeExecutionTime);
  }

  getMeanFPS() {
    const fpsIterationMean = this.fpsStats.map(fpsIteration => this.calculateMean(fpsIteration));
    return this.calculateMean(fpsIterationMean);
  }

  getMeanGPU() {
    const gpuIterationMean = this.gpuStats.map(gpuIteration => this.calculateMean(gpuIteration));
    return this.calculateMean(gpuIterationMean);
  }

  getMeanFirstRenderGPU() {
    const firstRenderGPU = [];
    this.gpuStats.map(gpuIteration => firstRenderGPU.push(gpuIteration[0]));

    return this.calculateMean(firstRenderGPU);
  }

  getFPSMeanInIteration() {
    const fpsIterationMean = this.fpsStats.map(fpsIteration => this.calculateMean(fpsIteration));
    return fpsIterationMean.map(fps => Math.round(Number(fps)));
  }

  getGPUMeanInIteration() {
    return this.gpuStats.map(gpuIteration => this.calculateMean(gpuIteration));
  }

  resetStatisticState() {
    this.iterationNum = -1;
    this.fpsStats = [];
    this.prevTime = performance.now();
    this.frames = 0;
    this.codeExecutionTime = [];
    this.gpuStats = [];
    this.numObjects = 0;
  }
}

export const statistic = new Statistic();
