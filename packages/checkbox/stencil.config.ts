import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'checkbox',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        { src: 'dist/client-style.scss' },
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
        { src: 'dist/client-style.scss' },
      ]
    }
  ],
  plugins: [
    sass({
      includePaths: [
        'node_modules'
      ]
    })
  ]
}
