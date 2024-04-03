import './style.css'
import messageContainer from './src/components/message-container';
import canvasContainer from './src/components/canvas-container';
import settingsContainer from './src/components/settings-container';
import testContainer from './src/components/test-container';

document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    ${messageContainer}
    ${canvasContainer}
    <div class="functions-container">
      ${settingsContainer}
      ${testContainer}
    </div>
  </div>
`;

