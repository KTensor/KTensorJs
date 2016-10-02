import {Tensor} from 'tensor';

class Node {
  constructor(op, parameters){
    this._op = op;
    this._parameters = parameters;
    this._val = null;
  }

  run(){

  }
}

class Variable {
  constructor(){

  }
}

class State {
  constructor(){

  }
}

class Constant {
  constructor(){

  }
}

const t = {
  Tensor, Variable, State, Constant
};

const dot = (matrix_1, matrix_2)=>{
  return matrix_1;
};

const op = {
  dot
};

const run = (node, variables)=>{

};

export {
  t, op, run
};
