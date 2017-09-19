let expect = require('chai').expect;
let jetSet = require('../src/jetSet');

describe('Getting (state.someProp)', function() {
    it('should set up an empty store by default', () => {
        let state = jetSet();
        expect(Object.keys(state).length).to.equal(0);
    });

    it('should set up with a store populated by given defaults', () => {
        let state = jetSet({
            defaultBool: true,
            defaultStr: 'Yes',
            defaultNum: 1,
        });

        expect(state.defaultBool).to.be.true;
        expect(state.defaultStr).to.equal('Yes');
        expect(state.defaultNum).to.equal(1);
    });

    it('should return "undefined" for unset values', () => {
        let state = jetSet();
        expect(state.notSet).to.be.undefined;
    });

    it('should return the value from a derived/function', () => {
        let state = jetSet({
            val1: 2,
            val2: 3,
            derived: () => state.val1 + state.val2
        });

        expect(state.derived).to.equal(5);
    });
});
