let expect = require('chai').expect;
let JetSet = require('../JetSet');

describe('JetSet.on()', () => {

    let jetSet;
    beforeEach(() => {
        jetSet = new JetSet();
    });

    it('should instantiate with the public .on() method', () => {
        expect(jetSet instanceof JetSet).to.be.true;
        expect(jetSet.on).not.to.be.undefined;
    });

    it('should accept an object of actions keyed to a setting', () => {
        jetSet.on({
            simpleString: 'here',
            number: 100,
            someThing: () => true,
            anotherThing: () => 1 + 1,
        });

        // should not throw an exception
    });

    it('should return the instance on success', () => {
        let returnCheck = jetSet.on({
            this: () => 'that'
        });

        expect(returnCheck instanceof JetSet).to.be.true;
    });

    it('should execute the given callbacks when a value changes', () => {
        let changed1 = false;
        let changed2 = false;

        jetSet.on({
            willChange: () => changed1 = true,
            willAlsoChange: () => changed2 = true,
        });

        jetSet.set({
            willChange: 'some change',
            willAlsoChange: 'some change',
        });

        expect(changed1).to.be.true;
        expect(changed2).to.be.true;
    });

    it('should provide the updated value to a given callback', () => {
        let callbackParam;

        jetSet.on({
            thisWillChange: (val) => callbackParam = val
        });

        jetSet.set({
            thisWillChange: 'provided'
        });

        expect(callbackParam).to.equal('provided');
    });
});
