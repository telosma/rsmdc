import { RSFoundation } from '@rsmdc/base/foundation';
import { RSSliderAdapter } from './adapter';
export declare class RSSliderFoundation extends RSFoundation<RSSliderAdapter> {
    static readonly cssClasses: {
        ACTIVE: string;
        DISABLED: string;
        DISCRETE: string;
        FOCUS: string;
        HAS_TRACK_MARKER: string;
        IN_TRANSIT: string;
        IS_DISCRETE: string;
    };
    static readonly strings: {
        ARIA_DISABLED: string;
        ARIA_VALUEMAX: string;
        ARIA_VALUEMIN: string;
        ARIA_VALUENOW: string;
        CHANGE_EVENT: string;
        INPUT_EVENT: string;
        LAST_TRACK_MARKER_SELECTOR: string;
        PIN_VALUE_MARKER_SELECTOR: string;
        STEP_DATA_ATTR: string;
        THUMB_CONTAINER_SELECTOR: string;
        TRACK_MARKER_CONTAINER_SELECTOR: string;
        TRACK_SELECTOR: string;
    };
    static readonly numbers: {
        PAGE_FACTOR: number;
    };
    static readonly defaultAdapter: RSSliderAdapter;
    private rect_;
    /**
     * We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
     * because those could be valid tabindices set by the client code.
     */
    private savedTabIndex_;
    private active_;
    private inTransit_;
    private isDiscrete_;
    private hasTrackMarker_;
    private handlingThumbTargetEvt_;
    private min_;
    private max_;
    private step_;
    private value_;
    private disabled_;
    private preventFocusState_;
    private readonly thumbContainerPointerHandler_;
    private readonly interactionStartHandler_;
    private readonly keydownHandler_;
    private readonly focusHandler_;
    private readonly blurHandler_;
    private readonly resizeHandler_;
    constructor(adapter?: Partial<RSSliderAdapter>);
    init(): void;
    destroy(): void;
    setupTrackMarker(): void;
    layout(): void;
    getValue(): number;
    setValue(value: number): void;
    getMax(): number;
    setMax(max: number): void;
    getMin(): number;
    setMin(min: number): void;
    getStep(): number;
    setStep(step: number): void;
    isDisabled(): boolean;
    setDisabled(disabled: boolean): void;
    /**
     * Called when the user starts interacting with the slider
     */
    private handleDown_;
    /**
     * Called when the user moves the slider
     */
    private handleMove_;
    /**
     * Called when the user's interaction with the slider ends
     */
    private handleUp_;
    /**
     * Returns the pageX of the event
     */
    private getPageX_;
    /**
     * Sets the slider value from an event
     */
    private setValueFromEvt_;
    /**
     * Computes the new value from the pageX position
     */
    private computeValueFromPageX_;
    /**
     * Handles keydown events
     */
    private handleKeydown_;
    /**
     * Returns the computed name of the event
     */
    private getKeyId_;
    /**
     * Computes the value given a keyboard key ID
     */
    private getValueForKeyId_;
    private handleFocus_;
    private handleBlur_;
    /**
     * Sets the value of the slider
     */
    private setValue_;
    /**
     * Calculates the quantized value
     */
    private quantize_;
    private updateUIForCurrentValue_;
    /**
     * Toggles the active state of the slider
     */
    private setActive_;
    /**
     * Toggles the inTransit state of the slider
     */
    private setInTransit_;
    /**
     * Conditionally adds or removes a class based on shouldBePresent
     */
    private toggleClass_;
}
export default RSSliderFoundation;
