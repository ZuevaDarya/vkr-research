import { describe, expect, it } from 'vitest';
import testContainer from '../components/test-container';

describe('should render correctly', () => {
  const host = document.createElement('div');
  host.innerHTML = testContainer;
  document.body.appendChild(host);

  it('should contain setting button element', () => {
    expect(document.querySelector('#startTest')).toBeTruthy();

  });

  it('should contain setting input element', () => {
    expect(document.querySelector('#numIteration')).toBeTruthy();
  });
});
