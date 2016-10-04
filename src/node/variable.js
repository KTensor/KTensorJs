import assert from 'assert';
import {devMode} from 'utility';
import {Tensor} from 'tensor';

class Variable {
  /**
   * dimension of 0 in this context only, means that that dimension can be of any size
   */
  constructor(dimensions){
    this._dim = dimensions;
    this._output = null;
  }

  get type(){
    return 'node';
  }

  get nodeType(){
    return 'variable'
  }

  get size(){
    return this._dim;
  }

  get output(){
    return this._output;
  }

  assertTensor(tensor){
    devMode(()=>{
      for(let i = 0; i < tensor.size.length; i++){
        let k = this._dim[i];
        if(k !== 0){
          assert(tensor.size[i] === k);
        } else {
          assert(Number.isInteger(tensor.size[i]));
        }
      }
    });
  }

  run(state, context){
    const k = new Tensor(null, null, context.getValue(this));
    this.assertTensor(k);
    this._output = k;
    return this._output;
  }
}

export {
  Variable
};
