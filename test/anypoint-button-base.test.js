import { assert } from '@open-wc/testing';
import { AnypointButtonBase } from '../anypoint-button-base.js';
import sinon from 'sinon/pkg/sinon-esm.js';

// The base is not registered in custom elements registry and attempt to
// initialize the class would end up with error.
window.customElements.define('anypoint-button-base', AnypointButtonBase);

describe('AnypointButtonBase', function() {
  describe('constructor()', () => {
    it('Sets emphasis value', () => {
      const base = new AnypointButtonBase();
      assert.equal(base.emphasis, 'low');
    });
  });

  describe('emphasis setter and getter', () => {
    let base;
    beforeEach(() => {
      base = new AnypointButtonBase();
    });

    it('Sets other values', () => {
      base.emphasis = 'medium';
      assert.equal(base._emphasis, 'medium');
    });

    it('Calls _calculateElevation() when changing value', () => {
      const spy = sinon.spy(base, '_calculateElevation');
      base.emphasis = 'medium';
      assert.isTrue(spy.calledOnce, 'Function called');
    });

    it('Ignores _calculateElevation() when not changing value', () => {
      const spy = sinon.spy(base, '_calculateElevation');
      base.emphasis = 'low';
      assert.isFalse(spy.called);
    });
  });

  describe('toggles setter and getter', () => {
    let base;
    beforeEach(() => {
      base = new AnypointButtonBase();
      base.toggles = false;
    });

    it('Sets other values', () => {
      base.toggles = true;
      assert.isTrue(base._toggles);
    });

    it('Calls _calculateElevation() when changing value', () => {
      const spy = sinon.spy(base, '_calculateElevation');
      base.toggles = true;
      assert.isTrue(spy.calledOnce, 'Function called');
    });

    it('Ignores _calculateElevation() when not changing value', () => {
      const spy = sinon.spy(base, '_calculateElevation');
      base.toggles = false;
      assert.isFalse(spy.called);
    });
  });

  describe('_calculateElevation()', () => {
    let base;
    beforeEach(() => {
      base = new AnypointButtonBase();
      base.emphasis = 'high';
    });

    it('Sets elevation to 0 when not high', () => {
      base.emphasis = 'low';
      base._calculateElevation();
      assert.equal(base.elevation, 0);
    });

    it('Sets elevation to 2 when toggles and active', () => {
      base.toggles = true;
      base.active = true;
      base._calculateElevation();
      assert.equal(base.elevation, 2);
    });

    it('Sets elevation to 3 when pressed', () => {
      base._pressed = true;
      base._calculateElevation();
      assert.equal(base.elevation, 3);
    });

    it('Sets elevation to 1 otherwise', () => {
      base._calculateElevation();
      assert.equal(base.elevation, 1);
    });
  });

  describe('_controlStateChanged()', () => {
    it('Calls _calculateElevation()', () => {
      const base = new AnypointButtonBase();
      const spy = sinon.spy(base, '_calculateElevation');
      base._controlStateChanged();
      assert.isTrue(spy.called, 'Function called');
    });
  });

  describe('_buttonStateChanged()', () => {
    it('Calls _calculateElevation()', () => {
      const base = new AnypointButtonBase();
      const spy = sinon.spy(base, '_calculateElevation');
      base._buttonStateChanged();
      assert.isTrue(spy.called, 'Function called');
    });
  });
});