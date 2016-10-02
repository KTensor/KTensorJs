const K = require('../lib');
const expect = require('chai').expect;

describe('K.t', ()=>{
  describe('Tensor', ()=>{
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
    describe('#value', ()=>{
      it('should return the tensor as a multidimensional array', ()=>{
        const tensor = new K.t.Tensor(null, null, [[[1, 2] , [3, 4]], [[5, 6], [7, 8]]]);
        expect(tensor.value).to.eql([[[1, 2] , [3, 4]], [[5, 6], [7, 8]]]);
      });
    });
    describe('#calcDim(values)', ()=>{
      it('should calculate dimension vector of multidimensional array', ()=>{
        const tensor = new K.t.Tensor([1]);
        expect(tensor.calcDim([[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]]])).to.eql([3, 2, 2]);
      });
    });
    describe('#calcIndex(vector)', ()=>{
      it('should return the flattened value of the vector', ()=>{
        const tensor = new K.t.Tensor([3, 2, 2]);
        expect(tensor.calcIndex([2, 1, 1])).to.equal(11);
      });
    });
    describe('#getValue(vector)', ()=>{
      it('should return the value of the tensor at the vector', ()=>{
        const tensor = new K.t.Tensor(null, null, [[1, 2, 3], [4, 5, 6]]);
        expect(tensor.getValue([0, 2])).to.equal(3);
      });
    });
  });
});
