let expect = require('chai').expect;
let jetSet = require('../src/jetSet');

describe('Ignoring (state.offChange)', () => {
    let state;
    beforeEach(() => state = jetSet());

    it('should be available on an initialized store', () => {
        expect(state.offChange).not.to.be.undefined;
    });

    it('should remove an action from an observed property', () => {
        let toggle = false;
        let toggler = () => toggle = !toggle;

        state.onChange('changeMe', toggler);
        state.changeMe = 'ok';

        // ensure the "on" handler is working before testing removal
        expect(toggle).to.be.true;

        state.offChange('changeMe', toggler);
        state.changeMe = 'ok, again';

        expect(toggle).to.be.true; // still
    });

    it('should remove a single action from an action stack on an observed property', () => {
        let toggler1 = () => true;
        let toggler2 = () => true;

        state.onChange('changeMe', toggler1);
        state.onChange('changeMe', toggler2);

        expect(state.watchers.changeMe.length).to.equal(2);

        state.offChange('changeMe', toggler1);
        expect(state.watchers.changeMe.length).to.equal(1);
    });
});
