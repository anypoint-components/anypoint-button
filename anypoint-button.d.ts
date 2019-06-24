/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   anypoint-button.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html, css} from 'lit-element';

import {ButtonStateMixin, ControlStateMixin} from '@anypoint-web-components/anypoint-control-mixins/anypoint-control-mixins.js';

declare namespace AnypointUi {

  /**
   * `anypoint-button`
   * Anypoint styled button.
   */
  class AnypointButton {

    /**
     * If true, the button should be styled with a shadow according to Material Design.
     * This has no effect when theme is not set to `md`;
     */
    raised: boolean|null|undefined;

    /**
     * If true, the element will not produce a ripple effect when interacted
     * with via the pointer.
     */
    noink: boolean|null|undefined;

    /**
     * To be used to styles the button according to Material Design
     * principles. This enables ripple effect, adds border radius, and
     * enables `raised`property.
     * By default it renders Anypoint theme. Set to `md` to enable material design.
     */
    theme: string|null|undefined;
    _receivedFocusFromKeyboard: any;
    readonly canRipple: any;

    /**
     * A type of the button. Can be one of:
     * - `primary`
     * - `secondary`
     * - `tertiary`
     * - `danger`
     *
     * You can set own type but the style has to be applied within the
     * light DOM or you have to create own CSS variabnle and place it with
     * every occurence of the button.
     *
     * ```html
     * <style>
     * anypoint-button[type="my-type"] {
     *  background-color: var(--anypopint-button-my-type, red);
     * }
     * </style>
     * <anypoint-button type="myu-type">Click me</anypoint-button>
     * ```
     */
    type: String|null;

    /**
     * The z-depth of this element, from 0-5. Setting to 0 will remove the
     * shadow, and each increasing number greater than 0 will be "deeper"
     * than the last.
     * This is for MD implementation.
     */
    elevation: number|null|undefined;

    /**
     * Button emphasis in the UI.
     *
     * Possible values:
     * - `low` - Text buttons are typically used for less important actions.
     * - `medium` - Outlined buttons are used for more emphasis than text buttons due to the stroke.
     * - `high` - Contained buttons have more emphasis, as they use use a color fill and shadow.
     *
     * Emphasis related CSS variables override default ones.
     */
    emphasis: string|null|undefined;
    render(): any;
    connectedCallback(): void;
    _buttonStateChanged(): void;
    _controlStateChanged(): void;
    _calculateElevation(): void;
    _computeKeyboardClass(focus: any): void;
    _spaceKeyDownHandler(e: any): void;
    _spaceKeyUpHandler(e: any): void;
    _downHandler(e: any): void;
    _upHandler(e: any): void;
    _ensureRipple(e: any): void;
    getRipple(): any;
    hasRipple(): any;
    _createRipple(): any;
    _noinkChanged(noink: any): void;
    _themeChanged(theme: any): void;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "anypoint-button": AnypointUi.AnypointButton;
  }
}
