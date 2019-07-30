import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'checkbox-test',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'mixins.scss' }
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
        { src: 'mixins.scss' }
      ]
    }
  ]
};
