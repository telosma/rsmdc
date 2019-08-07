import { RSComponent } from '@rsmdc/base/component';
import { RSSliderFoundation } from './foundation';
export declare class RSSlider extends RSComponent<RSSliderFoundation> {
    static attachTo(root: Element): RSSlider;
    protected root_: HTMLElement;
    private thumbContainer_;
    private track_;
    private pinValueMarker_;
    private trackMarkerContainer_;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    initialize(): void;
    getDefaultFoundation(): RSSliderFoundation;
    initialSyncWithDOM(): void;
    layout(): void;
    stepUp(amount?: number): void;
    stepDown(amount?: number): void;
    private parseFloat_;
}
