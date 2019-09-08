const jetSet = require('../src/jet-set');

describe('Getting (state.someProp)', () => {
    test('creates an empty store', () => {
        const state = jetSet();
        expect(Object.keys(state).length).toEqual(0);
    });

    test('sets up a store populated by defaults', () => {
        const state = jetSet({
            defaultBool: true,
            defaultStr: 'Yes',
            defaultNum: 1,
        });

        expect(state.defaultBool).toBe(true);
        expect(state.defaultStr).toEqual('Yes');
        expect(state.defaultNum).toEqual(1);
    });

    test('returns "undefined" for unset values', () => {
        const state = jetSet();
        expect(state.notSet).toBeUndefined();
    });

    test('returns a static value', () => {
        const state = jetSet({
            static: 'hello'
        });

        expect(state.static).toEqual('hello');
    });

    test('returns a derived value', () => {
        const state = jetSet({
            val1: 2,
            val2: 3,
            derived: () => state.val1 + state.val2
        });

        expect(state.derived).toEqual(5);
    });
});
