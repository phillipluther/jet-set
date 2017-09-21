let expect = require('chai').expect;
let jetSet = require('../src/jetSet');

describe('Observing (state.onChange)', () => {
    let state;
    beforeEach(() => state = jetSet());

    it('should be available on an initialized store', () => {
        expect(state.onChange).not.to.be.undefined;
    });

    it('should accept a callback action for a given prop (change)', () => {
        state.onChange('myProp', () => 1 + 1);
        // expect no exceptions
    });

    it('should provide new and old value params to a given action', () => {
        let newValCheck, oldValCheck;
        state.myProp = 'OLD';
        state.onChange('myProp', (newVal, oldVal) => {
            newValCheck = newVal;
            oldValCheck = oldVal;
        });

        state.myProp = 'NEW';

        expect(newValCheck).to.equal('NEW');
        expect(oldValCheck).to.equal('OLD');
    });

    it('should not hijack function context for a given action', () => {
        let thisCheck;
        function fauxClass() {
            this.checker = 'fauxClass';
            thisCheck = this.checker;
        }

        let context = new fauxClass();
        let action = function() { return true; };

        state.onChange('changeMe', action.bind(context));
        state.changeMe = 'OK';

        expect(thisCheck).to.equal('fauxClass');
    });

    it('should update state.prototype.watchers for managing observed props', () => {
        state.onChange('changeMe', () => 1 + 1);
        expect(state.watchers.changeMe).not.to.be.undefined;
        expect(state.watchers.changeMe.length).to.equal(1);
    });

    it('should stack actions to a single observed property', () => {
        state.onChange('changeMe', () => 1 + 1);
        state.onChange('changeMe', () => 2 + 2);

        expect(state.watchers.changeMe.length).to.equal(2);
    });
});
