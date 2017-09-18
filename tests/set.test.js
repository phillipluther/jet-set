let expect = require('chai').expect;
let jetSet = require('../src/jetSet');

describe('Setting (state.someProp = someVal)', function() {
    let state;
    beforeEach(() => state = jetSet());

    it('should set a value on the store', () => {
        expect(state.someVal).to.be.undefined;

        state.someVal = true;
        expect(state.someVal).to.be.true;
    });

    it('should create a signature like an Object after setting', () => {
        state.someVal = true;
        state.someOtherVal = 'Y';

        expect(Object.keys(state).length).to.equal(2);
    });

    it('should accept primitive types, just like an Object', () => {
        state.someString = 'Y';
        state.someBool = true;
        state.someNum = 1;
        state.someNull = null;

        // expect no exceptions
    });

    it('should accept a function for creating derived properties', () => {
        state.derived = () => 1 + 1;
        //expect no exceptions
    });

    it('should "set" derived properties as static values', () => {
        state.derived = () => 1 + 1;
        expect(state.derived).to.be.a('number'); // not a function
    });

    it('should overwrite an existing value, just like an Object', () => {
        state.val = 'Hello!';
        state.val = 'Changed';

        expect(state.val).to.equal('Changed');
    });

    it('should trigger an action when an observed property changes', () => {
        let isChanged = false;
        state.on('changeMe', () => isChanged = true);
        state.changeMe = 'anything else';

        expect(isChanged).to.be.true;
    });

    it('should trigger an action stack when an observerd property changes', () => {
        let isChanged1 = false;
        let isChanged2 = false;

        state.on('changeMe', () => isChanged1 = true);
        state.on('changeMe', () => isChanged2 = true);

        state.changeMe = 'ok';
        expect(isChanged1).to.be.true;
        expect(isChanged2).to.be.true;
    });

    it('should not trigger an action when an observerd property does not change', () => {
        let isChanged = false;
        state.changeMe = true;

        state.on('changeMe', () => isChanged = true);
        state.changeMe = true;

        expect(isChanged).to.be.false;
    });
});
