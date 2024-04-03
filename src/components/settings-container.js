const settingsContainer = `
  <div class="settings-container">
    <label for="optimizationCheckbox">
      Оптимизация:
      <input type="checkbox" name="optimizationCheckbox" id="optimizationCheckbox">
    </label>
    <label for="animationCheckbox">
      Анимация:
      <input type="checkbox" name="animationCheckbox" id="animationCheckbox">
    </label>

    <input type="number" min="0" name="numObjects" id="numObjectsInput" placeholder="число объектов">
    <button id="addObjectsBtn">добавить объекты</button>
    <button id="clearBtn">удалить объекты</button>
  </div>
`;

export default settingsContainer;
