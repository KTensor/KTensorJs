const K = require('../lib');
const expect = require('chai').expect;

describe('K.t', ()=>{
  describe('class Tensor', ()=>{
    describe('#type', ()=>{
      it('should return the type of the object', ()=>{
        const tensor = new K.t.Tensor([1]);
        expect(tensor.type).to.equal('tensor');
      });
    });
    describe('#dimensions', ()=>{
      it('should return the shape of the tensor', ()=>{
        const tensor = new K.t.Tensor([3, 2, 2]);
        expect(tensor.dimensions).to.eql([3, 2, 2]);
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
      it('should return the flattened index of the vector', ()=>{
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
    describe('#getValueExplicit(index)', ()=>{
      it('should return the value of the tensor at the index', ()=>{
        const tensor = new K.t.Tensor(null, null, [[1, 2, 3], [4, 5, 6]]);
        expect(tensor.getValueExplicit(3)).to.equal(4);
      });
    });
    describe('#setValue(vector, value)', ()=>{
      it('should set the value of the tensor at the vector', ()=>{
        const tensor = new K.t.Tensor(null, null, [[1, 2, 3], [4, 5, 6]]);
        tensor.setValue([0, 2], 5);
        expect(tensor.getValue([0, 2])).to.equal(5);
      });
    });
  });

  describe('vectorModule', ()=>{
    describe('#calcIndexMemoized(arrLength, dimensions, vector)', ()=>{
      it('should return the index of the vector of a tensor with the given dimensions', ()=>{
        expect(K.t.vectorModule.calcIndexMemoized(12, [3, 2, 2], [2, 1, 1])).to.equal(11);
      });
    });
  });
});
