/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface RsImageList {}
  interface RsImageListItem {}
  interface RsImageListLabel {}
  interface RsImageListMedia {
    'alt': string;
    'src': string;
  }
}

declare global {


  interface HTMLRsImageListElement extends Components.RsImageList, HTMLStencilElement {}
  var HTMLRsImageListElement: {
    prototype: HTMLRsImageListElement;
    new (): HTMLRsImageListElement;
  };

  interface HTMLRsImageListItemElement extends Components.RsImageListItem, HTMLStencilElement {}
  var HTMLRsImageListItemElement: {
    prototype: HTMLRsImageListItemElement;
    new (): HTMLRsImageListItemElement;
  };

  interface HTMLRsImageListLabelElement extends Components.RsImageListLabel, HTMLStencilElement {}
  var HTMLRsImageListLabelElement: {
    prototype: HTMLRsImageListLabelElement;
    new (): HTMLRsImageListLabelElement;
  };

  interface HTMLRsImageListMediaElement extends Components.RsImageListMedia, HTMLStencilElement {}
  var HTMLRsImageListMediaElement: {
    prototype: HTMLRsImageListMediaElement;
    new (): HTMLRsImageListMediaElement;
  };
  interface HTMLElementTagNameMap {
    'rs-image-list': HTMLRsImageListElement;
    'rs-image-list-item': HTMLRsImageListItemElement;
    'rs-image-list-label': HTMLRsImageListLabelElement;
    'rs-image-list-media': HTMLRsImageListMediaElement;
  }
}

declare namespace LocalJSX {
  interface RsImageList extends JSXBase.HTMLAttributes<HTMLRsImageListElement> {}
  interface RsImageListItem extends JSXBase.HTMLAttributes<HTMLRsImageListItemElement> {}
  interface RsImageListLabel extends JSXBase.HTMLAttributes<HTMLRsImageListLabelElement> {}
  interface RsImageListMedia extends JSXBase.HTMLAttributes<HTMLRsImageListMediaElement> {
    'alt'?: string;
    'src'?: string;
  }

  interface IntrinsicElements {
    'rs-image-list': RsImageList;
    'rs-image-list-item': RsImageListItem;
    'rs-image-list-label': RsImageListLabel;
    'rs-image-list-media': RsImageListMedia;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

