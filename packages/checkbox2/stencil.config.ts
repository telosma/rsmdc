import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'checkbox-test',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'client-checkbox.scss' }
      ],
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'client-checkbox.scss' }
      ]
    }
  ]
};
