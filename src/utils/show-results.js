export default function showResults(label, data = null, type = '') {
  const resultsBlock = document.getElementById('results');
  let span = '';
  let dataToNum = 0;

  if (type === 'ms') {
    dataToNum = Number(data).toFixed(5);
  } else {
    dataToNum = Math.round(Number(data));
  }

  if (data !== null) {
    span = `
      <p class="results__result">
        <span class="results__label">${label}:</span><br> ${dataToNum} ${type}
      </p>
    `;
  } else {
    span = `
    <p class="results__result">
      <span class="results__label">${label}</span><br>
    </p>
  `;
  }

  resultsBlock.innerHTML += span;
}

