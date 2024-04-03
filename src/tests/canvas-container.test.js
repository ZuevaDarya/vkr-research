import { describe, expect, it } from 'vitest';
import canvasContainer from '../components/canvas-container';

describe('should render correctly', () => {
  const host = document.createElement('div');
  host.innerHTML = canvasContainer;
  document.body.appendChild(host);

  it('should contain canvas element', () => {
    expect(document.querySelector('#canvas')).toBeTruthy();
  });

  it('should contain setting buttons element', () => {
    expect(document.querySelector('#clearResultsBtn')).toBeTruthy();
    expect(document.querySelector('#exportTableBtn')).toBeTruthy();
  });
});
