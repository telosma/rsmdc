import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'select',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'mixin.scss' }
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
        { src: 'mixin.scss' }
      ],
    }
  ],
  plugins: [
    sass({
      includePaths: ['../../node_modules/']
    })
  ]
};
