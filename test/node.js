const K = require('../lib');
const expect = require('chai').expect;

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
