import { EventType, SpecificEventListener } from '@rsmdc/base/types';

export interface RSSliderAdapter {
    /**
     * Returns true if className exists for the slider Element
     */
    hasClass(className: string): boolean;
    /**
     * Adds a class to the slider Element
     */
    addClass(className: string): void;
    /**
     * Removes a class from the slider Element
     */
    removeClass(className: string): void;
    /**
     * Returns a string if attribute name exists on the slider Element, otherwise returns null
     */
    getAttribute(name: string): string | null;
    /**
     * Sets attribute name on slider Element to value
     */
    setAttribute(name: string, value: string): void;
    /**
     * Removes attribute name from slider Element
     */
    removeAttribute(name: string): void;
    /**
     * Returns the bounding client rect for the slider Element
     */
    computeBoundingRect(): ClientRect;
    /**
     * Returns the tab index of the slider Element
     */
    getTabIndex(): number;
    /**
     * Registers an event handler on the root element for a given event.
     */
    registerInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Deregisters an event handler on the root element for a given event.
     */
    deregisterInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Registers an event handler on the thumb container element for a given event.
     */
    registerThumbContainerInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Deregisters an event handler on the thumb container element for a given event.
     */
    deregisterThumbContainerInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Registers an event handler on the body for a given event.
     */
    registerBodyInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Deregisters an event handler on the body for a given event.
     */
    deregisterBodyInteractionHandler<K extends EventType>(evtType: K, handler: SpecificEventListener<K>): void;
    /**
     * Registers an event handler for the window resize event
     */
    registerResizeHandler(handler: SpecificEventListener<'resize'>): void;
    /**
     * Deregisters an event handler for the window resize event
     */
    deregisterResizeHandler(handler: SpecificEventListener<'resize'>): void;
    /**
     * Emits a custom event MDCSlider:input from the root
     */
    notifyInput(): void;
    /**
     * Emits a custom event MDCSlider:change from the root
     */
    notifyChange(): void;
    /**
     * Sets a style property of the thumb container element to the passed value
     */
    setThumbContainerStyleProperty(propertyName: string, value: string): void;
    /**
     * Sets a style property of the track element to the passed value
     */
    setTrackStyleProperty(propertyName: string, value: string): void;
    /**
     * Sets the inner text of the pin marker to the passed value
     */
    setMarkerValue(value: number): void;
    /**
     * Appends the passed number of track markers to the track mark container element
     */
    appendTrackMarkers(numMarkers: number): void;
    /**
     * Removes all track markers fromt he track mark container element
     */
    removeTrackMarkers(): void;
    /**
     * Sets a style property of the last track marker to the passed value
     */
    setLastTrackMarkersStyleProperty(propertyName: string, value: string): void;
    /**
     * Returns true if the root element is RTL, otherwise false
     */
    isRTL(): boolean;
}
