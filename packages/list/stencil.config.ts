import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'list',
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
      'rs-list', 
      'rs-list-item', 
      'rs-list-text',
      'rs-list-primary', 
      'rs-list-secondary', 
      'rs-list-meta', 
      'rs-list-graphic', 
      'rs-list-divider', 
      'rs-list-subheader',
      'rs-list-group'
    ]}
  ]
};
