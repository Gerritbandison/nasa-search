import { fixture, html, expect } from '@open-wc/testing';
import '../nasa-image.js';

describe('NasaImage', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<nasa-image></nasa-image>`);
  });
});
