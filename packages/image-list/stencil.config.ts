import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'image-list',
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
    { components: [
      'rs-image-list', 
      'rs-image-list-item', 
      'rs-image-list-label',
      'rs-image-list-media', 
    ]}
  ]
};
