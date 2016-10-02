import t from 'tensor';

class Node {
  constructor(op, parameters){
    this._op = op;
    this._parameters = parameters;
    this._val = null;
  }

  run(){

  }
}

const dot = (matrix_1, matrix_2)=>{
  return matrix_1;
};

const op = {
  dot
};

const run = (node, variables)=>{

};

const K = {
  t, op, run
};

export {
  K as default,
  t, op, run
};
