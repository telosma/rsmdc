import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'appbar',
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
    { components: ['rs-app-bar', 'rs-app-bar-title', 'rs-app-bar-nav']}
  ]
};
