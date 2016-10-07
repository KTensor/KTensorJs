import {Node} from 'node';
import {Tensor} from 'tensor';
import _ from 'lodash';
import {devMode} from 'utility';
import assert from 'assert';

const A = 129/127/Math.E;
const B = Math.log(A);
const C = (num)=>{
  return 1 + Math.pow(A, num);
};

const rectifier = (num)=>{
  return num + Math.log(C(num));
};

const rectifierPrime = _.memoize((num)=>{
  return 1 + B * (1 - 1/C(num));
});

const lreluOp = (state, context, node)=>{
  const tensor = node.run(state, context);
  const dim = _.copy(tensor.dimensions);
  const k = new Tensor(dim);
  const vals = k.valref;
  for(let i = 0; i < vals.length; i++){
    vals[i] = rectifier(tensor.valref[i]);
  }
  return k;
};

const lrelu = (node)=>{
  return new Node('leaky-rectified-linear-unit', lreluOp, [node]);
};

export {
  lrelu as default,
  lrelu
};
