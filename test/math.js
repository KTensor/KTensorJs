const K = require('../lib');
const expect = require('chai').expect;

describe('K.m', ()=>{
  describe('vector', ()=>{
    describe('#dot(vector1, vector2)', ()=>{
      it('should return the dot product of both vectors', ()=>{
        expect(K.m.vector.dot([2, 3, 4], [7, 6, 5])).to.equal(14+18+20);
      });
    });
    describe('#scale(vector, scalar, clone=false)', ()=>{
      it('should mutate and return the scaled vector when clone is false', ()=>{
        const k = [0, 1, 3, 4];
        const j = K.m.vector.scale(k, 2);
        expect(k).to.eql([0, 2, 6, 8]);
        expect(j).to.eql([0, 2, 6, 8]);
      });
      it('should return a new scaled vector when clone is true', ()=>{
        const k = [0, 1, 3, 4];
        const j = K.m.vector.scale(k, 2, true);
        expect(k).to.eql([0, 1, 3, 4]);
        expect(j).to.eql([0, 2, 6, 8]);
      });
    });
  });
});
