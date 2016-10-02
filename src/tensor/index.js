import {Tensor} from './tensor';

class Variable {
  constructor(name, dimensions, fill=0, values){
    this._tensor = new Tensor(dimensions, fill, values);
  }

  get type(){
    return 'variable';
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
  Tensor, Variable, Constant, State
};

export {
  t as default,
  Tensor, Variable, Constant, State
};
