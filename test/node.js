const K = require('../lib');
const expect = require('chai').expect;

describe('K.n', ()=>{
  describe('class Node', ()=>{
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

  describe('class Variable', ()=>{
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
    describe('#dimensions', ()=>{
      it('should return the dimensions of the variable', ()=>{
        const variable = new K.n.Variable([0, 10]);
        expect(variable.dimensions).to.eql([0, 10]);
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

  describe('class Constant', ()=>{
    describe('#type', ()=>{
      it('should return the type of the object', ()=>{
        const constant = new K.n.Constant([[0, 1], [2, 3]]);
        expect(constant.type).to.equal('node');
      });
    });
    describe('#nodeType', ()=>{
      it('should return the type of node', ()=>{
        const constant = new K.n.Constant([[0, 1], [2, 3]]);
        expect(constant.nodeType).to.equal('constant');
      });
    });
    describe('dimensions', ()=>{
      it('should return the dimensions of the constant', ()=>{
        const constant = new K.n.Constant([[0, 1], [2, 3], [4, 5]]);
        expect(constant.dimensions).to.eql([3, 2]);
      });
    });
    describe('#output', ()=>{
      it('should return the constant as a tensor', ()=>{
        const constant = new K.n.Constant([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
        expect(constant.output.value).to.eql([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
      });
    });
    describe('#run(state, context)', ()=>{
      it('should return the constant as a tensor', ()=>{
        const constant = new K.n.Constant([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
        expect(constant.run(null, null).value).to.eql([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
      });
    });
  });

  describe('class State', ()=>{
    describe('#type', ()=>{
      it('should return the type of object', ()=>{
        const state = new K.n.State('state1', [4, 4]);
        expect(state.type).to.equal('node');
      });
    });
    describe('#nodeType', ()=>{
      it('should return the type of node', ()=>{
        const state = new K.n.State('state1', [4, 4]);
        expect(state.nodeType).to.equal('state');
      });
    });
    describe('#id', ()=>{
      it('should return the id of the state', ()=>{
        const state = new K.n.State('state1', [4, 4]);
        expect(state.id).to.equal('state1');
      });
    });
    describe('#dimensions', ()=>{
      it('should return the dimensions of the state', ()=>{
        const state = new K.n.State('state1', [4, 4]);
        expect(state.dimensions).to.eql([4, 4]);
      });
    });
    describe('#output', ()=>{
      it('should return the state as a tensor', ()=>{
        const stateContext = new K.c.Context();
        stateContext.setValue('state1', [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
        const state = new K.n.State('state1', [4, 4]);
        const values = state.run(stateContext, null);
        expect(state.output.value).to.eql(values.value);
      });
    });
    describe('#run(state, context)', ()=>{
      it('should return the state as a tensor', ()=>{
        const stateContext = new K.c.Context();
        stateContext.setValue('state1', [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
        const state = new K.n.State('state1', [4, 4]);
        expect(state.run(stateContext, null).value).to.eql([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
      });
    });
  });
});
