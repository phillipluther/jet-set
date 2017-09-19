let expect = require('chai').expect;
let jetSet = require('../src/jetSet');

describe('Ignoring (state.off)', () => {
    let state;
    beforeEach(() => state = jetSet());

    it('should be available on an initialized store', () => {
        expect(state.off).not.to.be.undefined;
    });

    it('should remove an action from an observed property', () => {
        let toggle = false;
        let toggler = () => toggle = !toggle;

        state.on('changeMe', toggler);
        state.changeMe = 'ok';

        // ensure the "on" handler is working before testing removal
        expect(toggle).to.be.true;

        state.off('changeMe', toggler);
        state.changeMe = 'ok, again';

        expect(toggle).to.be.true; // still
    });

    it('should remove a single action from an action stack on an observed property', () => {
        let toggler1 = () => true;
        let toggler2 = () => true;

        state.on('changeMe', toggler1);
        state.on('changeMe', toggler2);

        expect(state.watchers.changeMe.length).to.equal(2);

        state.off('changeMe', toggler1);
        expect(state.watchers.changeMe.length).to.equal(1);
    });
});
