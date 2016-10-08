import {Node} from 'node';
import {Tensor} from 'tensor';
import {devMode} from 'utility';
import assert from 'assert';

const softmaxOp = (state, context, node)=>{
  const tensor = node.run(state, context);
  devMode(()=>{
    assert(tensor.dimensions.length === 2);
  });
  const rows = tensor.dimensions[0];
  const cols = tensor.dimensions[1];
  const k = new Array(rows);
  for(let i = 0; i < rows; i++){
    const row = tensor.getValues([i, 0], [i, cols-1]);
    const sum = 0;
    for(let j = 0; j < cols; j++){
      const num = Math.exp(vector[j]);
      row[j] = num;
      sum += num;
    }
    for(let j = 0; j < cols; j++){
      row[j] /= sum;
    }
    k[i] = row;
  }
  return new Tensor(null, null, k);
};

const softmax = (node)=>{
  return new Node('softmax', softmaxOp, [node]);
};

export {
  softmax as default,
  softmax
}
