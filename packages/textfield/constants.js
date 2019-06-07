var strings = {
    ARIA_CONTROLS: 'aria-controls',
    ICON_SELECTOR: '.rs-text-field__icon',
    INPUT_SELECTOR: '.rs-text-field__input',
    LABEL_SELECTOR: '.rs-floating-label',
    LINE_RIPPLE_SELECTOR: '.rs-line-ripple',
    OUTLINE_SELECTOR: '.rs-notched-outline',
};
var cssClasses = {
    DENSE: 'rs-text-field--dense',
    DISABLED: 'rs-text-field--disabled',
    FOCUSED: 'rs-text-field--focused',
    HELPER_LINE: 'rs-text-field-helper-line',
    INVALID: 'rs-text-field--invalid',
    OUTLINED: 'rs-text-field--outlined',
    ROOT: 'rs-text-field',
    TEXTAREA: 'rs-text-field--textarea',
    WITH_LEADING_ICON: 'rs-text-field--with-leading-icon',
};
var numbers = {
    DENSE_LABEL_SCALE: 0.923,
    LABEL_SCALE: 0.75,
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */
var VALIDATION_ATTR_WHITELIST = [
    'pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength',
];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */
var ALWAYS_FLOAT_TYPES = [
    'color', 'date', 'datetime-local', 'month', 'range', 'time', 'week',
];
export { cssClasses, strings, numbers, VALIDATION_ATTR_WHITELIST, ALWAYS_FLOAT_TYPES };
//# sourceMappingURL=constants.js.map