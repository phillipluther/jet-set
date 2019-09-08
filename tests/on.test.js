const jetSet = require('../src/jet-set');

describe('Observing (state.onChange)', () => {
    let state;
    beforeEach(() => state = jetSet());

    test('hook is available on a store', () => {
        expect(state.onChange).not.toBeUndefined();
    });

    test('accepts a callback for a prop (change)', () => {
        state.onChange('myProp', () => 1 + 1);
        // expect no exceptions
    });

    test('provides new and old value params to an action', () => {
        let newValCheck, oldValCheck;
        state.myProp = 'OLD';
        state.onChange('myProp', (newVal, oldVal) => {
            newValCheck = newVal;
            oldValCheck = oldVal;
        });

        state.myProp = 'NEW';

        expect(newValCheck).toEqual('NEW');
        expect(oldValCheck).toEqual('OLD');
    });

    test('does not hijack function context for a given action', () => {
        let thisCheck;
        function fauxClass() {
            this.checker = 'fauxClass';
            thisCheck = this.checker;
        }

        const context = new fauxClass();
        const action = function() { return true; };

        state.onChange('changeMe', action.bind(context));
        state.changeMe = 'OK';

        expect(thisCheck).toEqual('fauxClass');
    });

    test('updates watchers for observed props', () => {
        state.onChange('changeMe', () => 1 + 1);
        expect(state.watchers.changeMe).not.toBeUndefined();
        expect(state.watchers.changeMe.length).toEqual(1);
    });

    test('stacks actions for a property', () => {
        state.onChange('changeMe', () => 1 + 1);
        state.onChange('changeMe', () => 2 + 2);

        expect(state.watchers.changeMe.length).toEqual(2);
    });
});
