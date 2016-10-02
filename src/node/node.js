class Node {
  constructor(op, parameters){
    this._op = op;
    this._parameters = parameters;
    this._val = null;
  }

  get type(){
    return 'node';
  }

  run(){

  }
}

export {
  Node
};
