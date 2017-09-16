let expect = require('chai').expect;
let JetSet = require('../JetSet');

describe('JetSet.set()', () => {

    let jetSet;
    beforeEach(() => {
        jetSet = new JetSet();
    });

    it('should instantiate with the public .set() method', () => {
        expect(jetSet instanceof JetSet).to.be.true;
        expect(jetSet.set).not.to.be.undefined;
    });

    it('should accept an object of key/val pairs', () => {
        jetSet.set({
            some: 'thing',
            another: 'thing',
            num: 2,
        });
    });

    it('should set given key/vals for retrieval with .get()', () => {
        jetSet.set({
            this: 'that',
            that: 'this',
        });

        expect(jetSet.get('this')).to.equal('that');
        expect(jetSet.get('that')).to.equal('this');
    });

    it('should return the instance on success', () => {
        let returnCheck = jetSet.set({
            this: 'that',
        });

        expect(returnCheck instanceof JetSet).to.be.true;
    });
});
