const K = require('../lib');
const expect = require('chai').expect;

describe('K.c', ()=>{
  describe('Context', ()=>{
    describe('#setValue', ()=>{

    });
    describe('#getValue', ()=>{

    });
  });
});

describe('K.t', ()=>{
  describe('Tensor', ()=>{
    describe('#type', ()=>{
      it('should return the type of the object', ()=>{
        const tensor = new K.t.Tensor([1]);
        expect(tensor.type).to.equal('tensor');
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
    describe('#setValue(vector, value)', ()=>{
      it('should set the value of the tensor at the vector', ()=>{
        const tensor = new K.t.Tensor(null, null, [[1, 2, 3], [4, 5, 6]]);
        tensor.setValue([0, 2], 5);
        expect(tensor.getValue([0, 2])).to.equal(5);
      });
    })
  });
});

describe('K.n', ()=>{
  describe('Node', ()=>{
    describe('#type', ()=>{
      it('should return the type of the object', ()=>{
        const node = new K.n.Node();
        expect(node.type).to.equal('node');
      });
    });
    describe('#nodeType', ()=>{
      it('should return the type of node', ()=>{
        const node = new K.n.Node();
        expect(node.nodeType).to.equal('operation');
      });
    });
  });
  describe('Variable', ()=>{
    describe('#type', ()=>{
      it('should return the type of the object', ()=>{
        const variable = new K.n.Variable([1]);
        expect(variable.type).to.equal('node');
      });
    });
    describe('#nodeType', ()=>{
      it('should return the type of node', ()=>{
        const variable = new K.n.Variable([1]);
        expect(variable.nodeType).to.equal('variable');
      });
    });
    describe('#size', ()=>{
      it('should return the dimension of the variable', ()=>{
        const variable = new K.n.Variable([0, 10]);
        expect(variable.size).to.eql([0, 10]);
      });
    });
    describe('#output', ()=>{
      it('should return null by default', ()=>{
        const variable = new K.n.Variable([0, 10]);
        expect(variable.output).to.equal(null);
      });
      it('should return the output of the run as a tensor', ()=>{
        const variable = new K.n.Variable([0, 3]);
        const context = new K.c.Context();
        context.setValue(variable, [[1, 2, 3], [4, 5, 6]]);
        variable.run(null, context);
        expect(variable.output.value).to.eql([[1, 2, 3], [4, 5, 6]]);
      });
    });
    describe('#run(state, context)', ()=>{
      it('should return the variable as a tensor', ()=>{
        const variable = new K.n.Variable([0, 3]);
        const context = new K.c.Context();
        context.setValue(variable, [[1, 2, 3], [4, 5, 6]]);
        expect(variable.run(null, context).value).to.eql([[1, 2, 3], [4, 5, 6]]);
      });
    });
  });
});
