export default function getTestMessage(isOptimizated) {
  let fpsMessage = '', gpuMessage = '';

  if (!isOptimizated) {
    fpsMessage = 'FPS без оптимизации';
    gpuMessage = 'Время на GPU без оптимизации';
  } else {
    fpsMessage = 'FPS с оптимизацией';
    gpuMessage = 'Время на GPU с оптимизацей';
  }

  return {
    fpsMessage,
    gpuMessage
  }
}
