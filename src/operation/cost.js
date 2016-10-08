import {Node} from 'node';
import {Tensor} from 'tensor';
import {devMode} from 'utility';
import assert from 'assert';

// average(sum(-y_*ln(y)))

const crossEntropyOp = (state, context, nodeActual, nodeExpected)=>{
  const tensorActual = nodeActual.run(state, context);
  const tensorExpected = nodeExpected.run(state, context);
  devMode(()=>{
    assert(tensorActual.dimensions.length === 2);
    assert.deepEqual(tensorActual.dimensions, tensorExpected.dimensions);
  });
  const rows = tensorActual.dimensions[0];
  const cols = tensorExpected.dimensions[1];
  let total = 0;
  for(let i = 0; i < rows; i++){
    const rowActual = tensorActual.getValues([i, 0], [i, cols-1]);
    const rowExpected = tensorExpected.getValues([i, 0], [i, cols-1]);
    let sum = 0;
    for(let j = 0; j < cols; j++){
      sum -= rowExpected[j] * Math.log(rowActual[j]);
    }
    total += sum;
  }
  return total / rows;
};

const crossEntropy = (nodeActual, nodeExpected)=>{
  return new Node('cross-entropy', crossEntropyOp, [nodeActual, nodeExpected]);
};

const cost = {
  crossEntropy
};

export {
  cost as default,
  crossEntropy
};
