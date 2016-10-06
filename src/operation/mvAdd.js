import {Node} from 'node';
import {Tensor} from 'tensor';
import {devMode} from 'utility';
import assert from 'assert';

const mvAddOp = (state, context, node1, node2)=>{
  const tensor1 = node1.run(state, context);
  const tensor2 = node2.run(state, context);
  devMode(()=>{
    assert(tensor1.dimensions.length === 2);
    assert(tensor2.dimensions.length == 1);
    assert(tensor1.dimensions[1] === tensor2.dimensions[0]);
  });
  const numRows = tensor1.dimensions[0];
  const numColumns = tensor1.dimensions[1];
  const k = new Array(numRows);
  for(let i = 0; i < numRows; i++){
    const row = new Array(numColumns);
    for(let j = 0; j < numColumns; j++){
      row[j] = tensor1.valref[i*numColumns + j] + tensor2.valref[j];
    }
    k[i] = row;
  }
  return new Tensor(null, null, k);
};

const mvAdd = (node1, node2)=>{
  return new Node('matrix-add-vector', mvAddOp, [node1, node2]);
};

export {
  mvAdd as default,
  mvAdd
};
