class Context {
  constructor(){
    this._context = {};
  }

  getValue(key){
    return this._context[key];
  }

  setValue(key, value){
    this._context[key] = value;
  }
}

export {
  Context
};
