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
    describe('#getIndicies(vector1, vector2)', ()=>{
      it('should return the indicies of the tensor bounded by vector1 and vector2', ()=>{
        const tensor = new K.t.Tensor(null, null, [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 17]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]]);
        expect(tensor.getIndicies([1, 1, 1], [2, 2, 2])).to.eql([13, 14, 16, 17, 22, 23, 25, 26]);
      });
    });
    describe('#getValues(vector1, vector2)', ()=>{
      it('should return the values of the tensor bounded by vector1 and vector2', ()=>{
        const tensor = new K.t.Tensor(null, null, [[[0, 1, 2], [3, 4, 5], [6, 7, 8]], [[9, 10, 11], [12, 13, 14], [15, 16, 42]], [[18, 19, 20], [21, 22, 23], [24, 25, 26]]]);
        expect(tensor.getValues([1, 1, 1], [2, 2, 2])).to.eql([13, 14, 16, 42, 22, 23, 25, 26]);
      });
    })
    describe('#setValue(vector, value)', ()=>{
      it('should set the value of the tensor at the vector', ()=>{
        const tensor = new K.t.Tensor(null, null, [[1, 2, 3], [4, 5, 6]]);
        tensor.setValue([0, 2], 5);
        expect(tensor.getValue([0, 2])).to.equal(5);
      });
    });
  });

  describe('tensorSubLibrary', ()=>{
    describe('#calcIndexMemoized(arrLength, dimensions, vector)', ()=>{
      it('should return the index of the vector of a tensor with the given dimensions', ()=>{
        expect(K.t.tensorSubLibrary.calcIndexMemoized(12, [3, 2, 2], [2, 1, 1])).to.equal(11);
      });
    });
    describe('#inconsistent(vector1, vector2)', ()=>{
      it('should return the first index of the value of vector1 that exceeds the respective value of vector 2', ()=>{
        expect(K.t.tensorSubLibrary.inconsistent([1, 5, 6], [3, 3, 3])).to.equal(1);
      });
      it('should return an index of -1 if vector1 is consistent with vector2', ()=>{
        expect(K.t.tensorSubLibrary.inconsistent([1, 5, 6], [8, 8, 8])).to.equal(-1);
      });
    });
    describe('#increment(vector, amount, place, cap)', ()=>{
      it('should mutate vector by incrementing the value in the index place from the end of the vector by the amount while keeping consistency with the vector cap', ()=>{
        const vector = [6, 7, 7];
        const cap = [7, 7, 7];
        K.t.tensorSubLibrary.increment(vector, 1, 1, cap);
        expect(vector).to.eql([7, 0, 0]);
        K.t.tensorSubLibrary.increment(vector, 9, 1, cap);
        expect(vector).to.eql([7, 1, 1]);
      });
    });
    describe('#calcIndiciesMemoized(arrLength, dimensions, vector', ()=>{
      it('should return the indicies of the tensor that are bounded by vector, inclusive', ()=>{
        expect(K.t.tensorSubLibrary.calcIndiciesMemoized(27, [3, 3, 3], [1, 1, 1])).to.eql([0, 1, 3, 4, 9, 10, 12, 13]);
      });
    });
    describe('#fallibleIncrement(vector, amount, place, cap)', ()=>{
      it('should mutate the vector by incrementing the value in the index place by amount if consisent and return true', ()=>{
        const vector = [6, 5, 4];
        const cap = [7, 7, 7];
        expect(K.t.tensorSubLibrary.fallibleIncrement(vector, 2, 2, cap)).to.eql(true);
        expect(vector).to.eql([6, 7, 4]);
      });
      it('should return false if the new value of the vector will be inconsistent and abort the increment', ()=>{
        const vector = [6, 5, 4];
        const cap = [7, 7, 7];
        expect(K.t.tensorSubLibrary.fallibleIncrement(vector, 3, 2, cap)).to.eql(false);
        expect(vector).to.eql([6, 5, 4]);
      });
    });
  });
});
