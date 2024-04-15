import resultsContainer from './results-container';
import infoContainer from './info-container';

const canvasContainer = `
  <div class="canvas-container">
    <canvas id="canvas" class="canvas"></canvas>
    ${infoContainer}
    ${resultsContainer}
  </div>
`;

export default canvasContainer;
