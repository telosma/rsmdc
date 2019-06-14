import { newE2EPage } from '@stencil/core/testing';

describe('rs-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<rs-selec></rs-selec>');
    const element = await page.find('rs-selec');
    expect(element).toHaveClass('hydrated');
  });
});
