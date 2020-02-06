# RSMDC

This is a package for using material design simply.


## Verification (for developer)

This package is supposed to use in nuxt also.  
So exists other nuxt envrironmental for verification.Please use it.  

### Setup

**This package:** 
```
$ git clone https://github.com/rsmdc/rsmdc.git
$ yarn
$ yarn build
```

**Verification repo:**
```
$ git clone https://github.com/smspp/nuxt-project-for-verification
$ yarn
$ yarn dev
```

### How to check

If you want to check your fixed.

**This package:**  
Build to your fixed.
```
$ cd ./packages/{target-component-name}
$ yarn build
```
Register package tempolary.  
Package name is registered by `package.json` name property.
```
$ yarn link
```
  
**Verification repo:**  
Register package.(Package is override)
```
$ yarn link package-name
```
nuxt.config.js
```
  ...
  build: {
    ...
   loaders: {
      scss: {
        includePaths: [
          path.resolve(__dirname, 'node_modules')
        ],
        data: `
          @import "~assets/variables";
          @import "@rsmdc/rsmdc/rsmdc.scss";
          @import "@rsmdc/{target-component-name}/rs-{component-name}.scss";
        `
      }
    }
    ...
  }

```
rsmdc.client.js
```
const component = require('@rsmdc/component/loader')
component.defineCustomElements(window)
```



