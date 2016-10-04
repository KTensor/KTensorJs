const K = require('../lib');
const expect = require('chai').expect;

describe('K.c', ()=>{
  describe('Context', ()=>{
    describe('#setValue(key, value)', ()=>{
      it('should set context variable to value', ()=>{
        const context = new K.c.Context();
        const k = {};
        context.setValue(k, [1, 2, 3]);
        expect(context.getValue(k)).to.eql([1, 2, 3]);
      });
    });
    describe('#getValue(key)', ()=>{
      it('should get context variable and return value', ()=>{
        const context = new K.c.Context();
        const k = {};
        context.setValue(k, [1, 2, 3]);
        expect(context.getValue(k)).to.eql([1, 2, 3]);
      });
    });
  });
});
