import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'dialog',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  bundles: [
    {
      components: [
        'rs-dialog',
        'rs-dialog-title',
        'rs-dialog-content'
      ]
    }
  ]
  
};
