import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'drawer',
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
      'rs-drawer', 
      'rs-drawer-header',
      'rs-drawer-title',
      'rs-drawer-subtitle',
      'rs-drawer-content'
    ]}
  ]
};
