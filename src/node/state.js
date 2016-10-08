import assert from 'assert';
import {devMode} from 'utility';
import {Tensor} from 'tensor';

const randomGaussian = ()=>{
  return (Math.random() < 0.5 ? -1 : 1) * Math.sqrt(-Math.log(Math.random()*0.998+0.002)/2/Math.PI);
};

const stateinit = {
  randomGaussian
};

class State {
  /**
   * dimension of 0 in this context only, means that that dimension can be of any dimensions
   */
  constructor(id, dimensions, initfunction=randomGaussian){
    this._id = id;
    this._initfunction = initfunction;
    this._dim = dimensions;
    this._output = null;
    this._noState = true;
  }

  get type(){
    return 'node';
  }

  get nodeType(){
    return 'state';
  }

  get id(){
    return this._id;
  }

  get dimensions(){
    return this._dim;
  }

  get output(){
    return this._output;
  }

  setState(state, data){
    state.setValue(this._id, data);
  }

  run(state, context){
    if(this._noState){
      if(!state.getValue(this._id)){
        const tensor = new Tensor(this._dim);
        const valref = tensor.valref;
        for(let i = 0; i < valref.length; i++){
          valref[i] = this._initfunction();
        }
        state.setValue(this._id, tensor.value);
      }
      this._noState = false;
    }
    const k = new Tensor(null, null, state.getValue(this._id));
    this._output = k;
    return this._output;
  }
}

export {
  State, stateinit
};
