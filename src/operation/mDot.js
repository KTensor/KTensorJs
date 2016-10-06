import {Node} from 'node';
import {Tensor, math} from 'tensor';
import {devMode} from 'utility';
import assert from 'assert';

const mDotOp = (state, context, node1, node2)=>{
  const tensor1 = node1.run(state, context);
  const tensor2 = node2.run(state, context);
  devMode(()=>{
    assert(tensor1.dimensions.length === 2);
    assert(tensor2.dimensions.length == 2);
    assert(tensor1.dimensions[1] === tensor2.dimensions[0]);
  });
  const numRows = tensor1.dimensions[0];
  const numColumns = tensor2.dimensions[1];
  const vecLength = tensor1.dimensions[1];
  const k = new Array(numRows);
  for(let i = 0; i < numRows; i++){
    const row = new Array(numColumns);
    for(let j = 0; j < numColumns; j++){
      let val = 0;
      for(let l = 0; l < vecLength; l++){
        val += tensor1.getValue([i, l]) * tensor2.getValue([l, j]);
      }
      row[j] = val;
    }
    k[i] = row;
  }
  return new Tensor(null, null, k);
};

const mDot = (node1, node2)=>{
  return new Node('matrix-multiply', mDotOp, [node1, node2]);
};

export {
  mDot as default,
  mDot
}
