/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/AnypointButtonBase.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement} from 'lit-element';

import {ButtonStateMixin, ControlStateMixin} from '@anypoint-web-components/anypoint-control-mixins/anypoint-control-mixins.js';

export {AnypointButtonBase};

/**
 * A base class for Anypoint buttons.
 * Use this class to create buttons that can be elevated (Material Design) and has
 * compatibility layer with the Anypoint platform.
 */
declare class AnypointButtonBase {
  /**
   * The z-depth of this element, from 0-5. Setting to 0 will remove the
   * shadow, and each increasing number greater than 0 will be "deeper"
   * than the last.
   * This is for MD implementation.
   */
  elevation: boolean;
  /**
   * Button emphasis in the UI.
   *
   * Possible values:
   * - `low` - Text buttons are typically used for less important actions.
   * - `medium` - Outlined buttons are used for more emphasis than text buttons due to the stroke.
   * - `high` - Contained buttons have more emphasis, as they use use a color fill and shadow.
   *
   * Default is "low".
   */
  emphasis: string;
  /**
   * When set ripple effect is not rendered.
   */
  noink: boolean;
  /**
   * @deprecated Use legacy instead.
   */
  legacy: boolean;
  /**
   * Enables compatibility with Anypoint components.
   */
  compatibility: boolean;
  constructor();

  /**
   * Computes current elevation for the material design.
   * The `emphasis` property is set when the updates are commited.
   */
  _calculateElevation(): Promise<void>;
  _controlStateChanged(): void;
  _buttonStateChanged(): void;
}

interface AnypointButtonBase extends ControlStateMixin, ButtonStateMixin, LitElement {
}
