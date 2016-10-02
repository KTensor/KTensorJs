const K = require('../lib');
const expect = require('chai').expect;

describe('K.t', ()=>{
  describe('Tensor', ()=>{
    describe('#calcIndex(vector)', ()=>{
      it('should return the flattened value of the vector', ()=>{
        const tensor = new K.t.Tensor([3, 2, 2]);
        expect(tensor.calcIndex([2, 1, 1])).to.equal(11);
      });
    });
    describe('#size', ()=>{
      it('should return the shape of the tensor', ()=>{
        const tensor = new K.t.Tensor([3, 2, 2]);
        expect(tensor.size).to.eql([3, 2, 2]);
      });
    });
    describe('#dimension', ()=>{
      it('should return the dimension of the tensor', ()=>{
        const tensor = new K.t.Tensor([3, 2, 2]);
        expect(tensor.dimension).to.equal(3);
      });
    });
  });
});
