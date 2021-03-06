/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface RsSwitch {
    'activateRipple': () => Promise<void>;
    'checked': boolean;
    'disabled': boolean;
    'id': string;
    'isDisabled': () => Promise<void>;
    'isHostChecked': () => Promise<void>;
    'label': string;
  }
}

declare global {


  interface HTMLRsSwitchElement extends Components.RsSwitch, HTMLStencilElement {}
  var HTMLRsSwitchElement: {
    prototype: HTMLRsSwitchElement;
    new (): HTMLRsSwitchElement;
  };
  interface HTMLElementTagNameMap {
    'rs-switch': HTMLRsSwitchElement;
  }
}

declare namespace LocalJSX {
  interface RsSwitch extends JSXBase.HTMLAttributes<HTMLRsSwitchElement> {
    'checked'?: boolean;
    'disabled'?: boolean;
    'id'?: string;
    'label'?: string;
    'onChange'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'rs-switch': RsSwitch;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


