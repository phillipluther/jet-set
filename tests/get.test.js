let expect = require('chai').expect;
let JetSet = require('../JetSet');

describe('JetSet.get()', function() {
    let jetSet;
    beforeEach(() => {
        jetSet = new JetSet({
            stringVal: 'String val',
            boolVal: true,
            numberVal: 200,
            functionVal: function() {
                return true;
            }
        });
    });

    it('should ...', () => {
        return true;
    });
    /*
    it('should instantiate with the public .get() method', () => {
        expect(jetSet instanceof JetSet).to.be.true;
        expect(jetSet.get).not.to.be.undefined;
    });

    it('should return the value of a given key', () => {
        expect(jetSet.get('stringVal')).to.equal('String val');
    });

    it('should return an object of key/val pairs from multiple keys', () => {
        let results = jetSet.get('stringVal', 'boolVal');
        expect(Object.keys(results).length).to.equal(2);
        expect(results.stringVal).to.equal('String val');
        expect(results.boolVal).to.be.true;
    });

    it('should return the result of a derived value, not the signature', () => {
        expect(jetSet.get('functionVal')).to.be.true;
    });

    it('should init populated with given defaults', () => {
        let defaults = jetSet.get(
            'stringVal',
            'boolVal',
            'numberVal',
            'functionVal'
        );

        expect(Object.keys(defaults).length).to.equal(4);
        expect(defaults.stringVal).to.equal('String val');
        expect(defaults.boolVal).to.be.true;
        expect(defaults.numberVal).to.equal(200);
        expect(defaults.functionVal).to.be.true;
    });
    */
});
