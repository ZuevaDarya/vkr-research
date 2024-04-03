export default function showResults(label, data, type = '') {
  const resultsBlock = document.getElementById('results');
  let dataToNum = 0;

  if (type === 'ms') {
    dataToNum = Number(data).toFixed(5);
  } else {
    dataToNum = Math.round(Number(data));
  }

  const span = `
    <p class="results__result">
      <span class="results__label">${label}:</span><br> ${dataToNum} ${type}
    </p>
  `;

  resultsBlock.innerHTML += span;
}

