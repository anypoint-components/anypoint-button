import { fixture, assert, aTimeout, nextFrame } from '@open-wc/testing';
import * as sinon from 'sinon';
import '../anypoint-button.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';

describe('<anypoint-button>', () => {
  async function basicFixture() {
    return fixture(`<anypoint-button>Button</anypoint-button>`);
  }

  async function roleFixture() {
    return fixture(
      `<anypoint-button role="radiobutton">Button</anypoint-button>`
    );
  }

  async function tabindexFixture() {
    return fixture(`<anypoint-button tabindex="-1">Button</anypoint-button>`);
  }

  async function togglesFixture() {
    return fixture(`<anypoint-button toggles>Button</anypoint-button>`);
  }

  async function noinkFixture() {
    return fixture(`<anypoint-button noink>Button</anypoint-button>`);
  }

  async function highEmphasisFixture() {
    return fixture(`<anypoint-button emphasis="high">Button</anypoint-button>`);
  }

  describe('a11y', () => {
    it('Has role set', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'button');
    });

    it('Respects existing role', async () => {
      const element = await roleFixture();
      assert.equal(element.getAttribute('role'), 'radiobutton');
    });

    it('Has tabindex set', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('Respects existing tabindex', async () => {
      const element = await tabindexFixture();
      assert.equal(element.getAttribute('tabindex'), '-1');
    });

    it('is accessible in normal state', async () => {
      const element = await fixture(
        `<anypoint-button>Button</anypoint-button>`
      );
      await assert.isAccessible(element);
    });

    it('is accessible in disabled state', async () => {
      const element = await fixture(
        `<anypoint-button disabled>Button</anypoint-button>`
      );
      await assert.isAccessible(element);
    });
  });

  describe('Initialization', () => {
    it('can be constructed with document.createElement', () => {
      const button = document.createElement('anypoint-icon-button');
      assert.ok(button);
    });

    it('has default emphasis', async () => {
      const button = await basicFixture();
      assert.equal(button.emphasis, 'low');
    });
  });

  describe('High emphasis state', () => {
    let element;
    beforeEach(async () => {
      element = await highEmphasisFixture();
    });

    it('Has elevation default elevation', () => {
      assert.equal(element.elevation, 1);
    });

    it('Has elevation when toggles and active', async () => {
      element.toggles = true;
      element.active = true;
      await nextFrame();
      assert.equal(element.elevation, 2);
    });

    it('pressed and released', async () => {
      MockInteractions.down(element);
      await nextFrame();
      assert.equal(element.elevation, 3);
      MockInteractions.up(element);
      await nextFrame();
      assert.equal(element.elevation, 1);
    });
  });

  describe('Low emphasis state', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Has default elevation', () => {
      assert.equal(element.elevation, 0);
    });

    it('Has default emphasis', () => {
      assert.equal(element.emphasis, 'low');
    });
  });

  describe('A button with toggles', () => {
    let element;
    beforeEach(async () => {
      element = await togglesFixture();
      element.emphasis = 'high';
    });

    it('activated by click', done => {
      MockInteractions.downAndUp(element, () => {
        setTimeout(() => {
          try {
            assert.equal(element.elevation, 2);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });

    it('receives focused', async () => {
      MockInteractions.focus(element);
      await nextFrame();
      assert.equal(element.elevation, 1);
    });
  });

  describe('Ripple effect', () => {
    let element;

    it('Riple has noink set', async () => {
      element = await noinkFixture();
      MockInteractions.down(element);
      MockInteractions.up(element);
      const ripple = element.shadowRoot.querySelector('paper-ripple');
      assert.isTrue(ripple.noink);
    });

    it('Resetting noink shows ripple', async () => {
      element = await noinkFixture();
      element.noink = false;
      await aTimeout(0);
      element.noink = true;
      const ripple = element.shadowRoot.querySelector('paper-ripple');
      assert.isFalse(ripple.noink);
    });

    it('Space bar runs ripple', async () => {
      element = await highEmphasisFixture();
      MockInteractions.pressSpace(element);
      await aTimeout(40);
      const ripple = element.shadowRoot.querySelector('paper-ripple');
      assert.ok(ripple);
    });
  });

  describe('_spaceKeyDownHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls _calculateElevation() when changing value', () => {
      const spy = sinon.spy(element, '_calculateElevation');
      element._spaceKeyDownHandler(new CustomEvent('keydown'));
      assert.isTrue(spy.calledOnce, 'Function called');
    });

    it('Calls uiDownAction() on ripple effect', () => {
      const spy = sinon.spy(element._ripple, 'uiDownAction');
      element._spaceKeyDownHandler(new CustomEvent('keydown'));
      assert.isTrue(spy.calledOnce, 'Function called');
    });

    it("Won't call uiDownAction() on ripple when animating", () => {
      element._spaceKeyDownHandler(new CustomEvent('keydown'));
      const spy = sinon.spy(element._ripple, 'uiDownAction');
      element._spaceKeyDownHandler(new CustomEvent('keydown'));
      assert.isFalse(spy.called, 'Function called');
    });
  });

  describe('_spaceKeyUpHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls _calculateElevation() when changing value', () => {
      const spy = sinon.spy(element, '_calculateElevation');
      element._spaceKeyUpHandler(new CustomEvent('keyup'));
      assert.isTrue(spy.calledOnce, 'Function called');
    });

    it('Calls uiUpAction() on ripple effect', () => {
      const spy = sinon.spy(element._ripple, 'uiUpAction');
      element._spaceKeyUpHandler(new CustomEvent('keyup'));
      assert.isTrue(spy.calledOnce, 'Function called');
    });
  });
});
