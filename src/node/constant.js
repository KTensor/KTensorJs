import assert from 'assert';
import {devMode} from 'utility';
import {Tensor} from 'tensor';
import _ from 'lodash';

class Constant {
  /**
   * dimension of 0 in this context only, means that that dimension can be of any dimensions
   */
  constructor(data){
    this._data = new Tensor(null, null, data);
  }

  get type(){
    return 'node';
  }

  get nodeType(){
    return 'constant';
  }

  get dimensions(){
    return this._data.dimensions;
  }

  get output(){
    return this._data;
  }

  run(state, context){
    return this._data;
  }
}

export {
  Constant
};
