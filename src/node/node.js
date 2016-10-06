class Node {
  constructor(op_name, op, parameters){
    this._op_name = op_name;
    this._op = op;
    this._parameters = parameters;
    this._output = null;
  }

  get type(){
    return 'node';
  }

  get nodeType(){
    return 'operation';
  }

  get opName(){
    return this._op_name;
  }

  get output(){
    return this._output;
  }

  run(state, context){
    this._output = this._op(state, context, ...this._parameters);
    return this._output;
  }
}

export {
  Node
};
