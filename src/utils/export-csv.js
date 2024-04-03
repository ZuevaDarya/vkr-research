export default function exportCSV(statistic, isOptimizated = false, isAnimate = false) {
  const isStatisticCorrect = checkStatistic(statistic);

  if (isStatisticCorrect) {
    const link = document.createElement('a');
    const data = prepareData(statistic);
    const blob = new Blob([data], { type: "text/csv" });
    const title = createTitle(isOptimizated, isAnimate);

    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
  } else {
    alert('Данные не собраны. Запустите тест!');
  }
}

function prepareData(statistic) {
  const titles = [
    'code execution time, ms',
    'fps, frame/sec',
    'gpu time, ms',
    'total mean',
    'number of generated objects'
  ];

  const meanValuesArr = [
    statistic.getMeanCodeExecutionTime(),
    statistic.getMeanFPS(),
    statistic.getMeanGPU()
  ];

  const fixedCodeExecutionTime = statistic.codeExecutionTime.map(time => Number(time).toFixed(5));
  const fixedGPUInIteration = statistic.getGPUMeanInIteration().map(gpu => Number(gpu).toFixed(5));

  const rows = [
    [...new Array(statistic.iterationNum + 2).fill(''), titles[3]],
    [titles[0], ...fixedCodeExecutionTime, meanValuesArr[0].toFixed(5)],
    [titles[1], ...statistic.getFPSMeanInIteration(), Math.round(Number(meanValuesArr[1]))],
    [titles[2], ...fixedGPUInIteration, meanValuesArr[2].toFixed(5)],
    [],
    [titles[4], statistic.numObjects]
  ];

  const csvString = rows.map(e => e.join(';')).join('\n');
  return csvString;
}

function checkStatistic(statistic) {
  const isEmpty =
    statistic.codeExecutionTime.length === 0 ||
    statistic.gpuStats.length === 0 ||
    statistic.fpsStats.length === 0;

  if (!statistic || isEmpty) {
    return false;
  } else {
    return true;
  }
}

function createTitle(isOptimizated = false, isAnimate = false) {
  let title = '';

  if (isOptimizated) {
    title = 'test_results_with_optimization.csv';

    if (isAnimate) {
      title = 'test_results_animation_with_optimization.csv';
    }
  } else {
    title = 'test_results_without_optimization.csv';

    if (isAnimate) {
      title = 'test_results_animation_without_optimization.csv';
    }
  }

  return title;
}

