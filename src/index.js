class Tensor {
  constructor(){

  }
}

class Node {
  constructor(op, ...parent){
    this._op = op;
    this._parent = parent;
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
  Variable, State, Constant
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
