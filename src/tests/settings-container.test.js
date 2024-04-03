import { describe, expect, it } from 'vitest';
import settingsContainer from '../components/settings-container';

describe('should render correctly', () => {
  const host = document.createElement('div');
  host.innerHTML = settingsContainer;
  document.body.appendChild(host);

  it('should contain setting buttons element', () => {
    expect(document.querySelector('#addObjectsBtn')).toBeTruthy();
    expect(document.querySelector('#clearBtn')).toBeTruthy();
  });

  it('should contain setting checkbox element', () => {
    expect(document.querySelector('#optimizationCheckbox')).toBeTruthy();
    expect(document.querySelector('#animationCheckbox')).toBeTruthy();
  });

  it('should contain setting input element', () => {
    expect(document.querySelector('#numObjectsInput')).toBeTruthy();
  });
});
