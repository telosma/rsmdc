import { RSComponent } from '@rsmdc/base/component';
import { RSRipple, RSRippleCapableSurface } from '@rsmdc/ripple/index';
import { RSSwitchFoundation } from './foundation';
export declare class RSSwitch extends RSComponent<RSSwitchFoundation> implements RSRippleCapableSurface {
    static attachTo(root: HTMLElement): RSSwitch;
    root_: Element;
    private readonly ripple_;
    private changeHandler_;
    destroy(): void;
    initialSyncWithDOM(): void;
    getDefaultFoundation(): RSSwitchFoundation;
    readonly ripple: RSRipple;
    checked: boolean;
    disabled: boolean;
    private createRipple_;
    private readonly nativeControl_;
}
