export interface RSSwitchAdapter {
    /**
     * Adds a CSS class to the root element.
     */
    addClass(className: string): void;
    /**
     * Removes a CSS class from the root element.
     */
    removeClass(className: string): void;
    /**
     * Sets checked state of the native HTML control underlying the switch.
     */
    setNativeControlChecked(checked: boolean): void;
    /**
     * Sets the disabled state of the native HTML control underlying the switch.
     */
    setNativeControlDisabled(disabled: boolean): void;
}
