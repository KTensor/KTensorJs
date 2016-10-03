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
      tensor.size.forEach((val, index)=>{
        let k = this._dim[index];
        if(k !== 0){
          assert(val === k);
        } else {
          assert(Number.isInteger(val));
        }
      });
    });
  }

  run(state, context){
    console.log(context);
    const k = new Tensor(null, null, context.getValue(this));
    this.assertTensor(k);
    this._output = k;
    return this._output;
  }
}

export {
  Variable
};
