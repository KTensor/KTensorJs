import _ from 'lodash';
import assert from 'assert';
import {devMode} from 'utility';

const calcIndexMemoized = _.memoize(
  (arrLength, dimensions, vector)=>{
    let total = 0;
    let factor = arrLength;
    for(let i = 0; i < vector.length; i++){
      factor /= dimensions[i];
      total += factor * vector[i];
    }
    return total;
  },
  (arrLength, dimensions, vector)=>{
    return JSON.stringify([arrLength, dimensions, vector]);
  }
);

/**
 * _dim: dimension vector
 * _value: flattened array of values
 * size: _dim
 * dimension: _dim.length
 * value: shaped nested array of values
 * calcDim: calculates dimension vector of multidimensional array
 * calcIndex(vector): transforms vector index into flattened index
 * getValue(vector): get value in tensor at vector
 * setValue(vector, value): set value in tensor at vector
 */
class Tensor {
  constructor(dimensions, fill=0, values){
    if(values){
      this._dim = this.calcDim(values);
      this._value = _.flattenDeep(values);
    } else {
      this._dim = dimensions;
      let k = 1;
      for(let i = 0; i < this._dim.length; i++){
        k *= this._dim[i];
      }
      this._value = new Array(k);
      for(let i = 0; i < this._value.length; i++){
        this._value[i] = fill;
      }
    }
  }

  get type(){
    return 'tensor';
  }

  get size(){
    return this._dim;
  }

  get dimension(){
    return this._dim.length;
  }

  calcDim(values){
    const j = [];
    let k = values;
    while(Array.isArray(k)){
      j.push(k.length);
      k = k[0];
    }
    return j;
  }

  calcIndex(vector){
    return calcIndexMemoized(this._value.length, this._dim, vector);
  }

  assertVector(vector){
    devMode(()=>{
      assert(Array.isArray(vector), `vector ${vector} must be an array`);
      assert(vector.length === this._dim.length, `vector ${vector} must have length ${this._dim.length}`);
      assert(Number.isInteger(vector[0]), `vector ${vector} must contain integers`);
      for(let i = 0; i < vector.length; i++){
        assert(vector[i] < this._dim[i], `vector ${vector} exceeds tensor size`);
      }
    });
  }

  getValue(vector){
    this.assertVector(vector);
    return this._value[this.calcIndex(vector)];
  }

  setValue(vector, value){
    this.assertVector(vector);
    this._value[this.calcIndex(vector)] = value;
  }

  get value(){
    if(this._dim.length < 2){
      return this._values;
    } else {
      let total = this._value;
      for(let i = 1; i < this._dim.length; i++){
        total = _.chunk(total, this._dim[i]);
      }
      return total;
    }
  }
}

export {
  Tensor
};
