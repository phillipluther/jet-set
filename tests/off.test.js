let expect = require('chai').expect;
let JetSet = require('../JetSet');

describe('JetSet.off()', () => {

    let jetSet, changed;
    let handleChange = () => changed = true;

    beforeEach(() => {
        changed = false;
        jetSet = new JetSet({
            changeMe: 0
        });

        jetSet.on({
            changeMe: handleChange
        });
    });

    it('should instantiate with the public .off() method', () => {
        expect(jetSet instanceof JetSet).to.be.true;
        expect(jetSet.off).not.to.be.undefined;
    });

    it('should accept an object of setting/callback pairs to unset', () => {
        jetSet.off({
            changeMe: handleChange
        });

        // should not throw exception
    });

    it('should remove an action from the given value', () => {
        jetSet.off({
            changeMe: handleChange
        });

        jetSet.set({
            changeMe: 1
        });

        expect(changed).to.be.false;
    });

    it('should only remove the specified action if multiple actions are set', () => {
        let otherChange = 0;
        jetSet.on({
            changeMe: () => otherChange++
        });

        jetSet.off({
            changeMe: handleChange
        });

        jetSet.set({
            changeMe: 1
        });

        expect(changed).to.be.false;
        expect(otherChange).to.equal(1);
    });
});
