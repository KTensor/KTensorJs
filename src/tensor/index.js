import assert from 'assert';
import _ from 'lodash';
import {devMode} from 'utility';

/**
 * _dim: dimension vector
 * _value: flattened array of values
 * size: _dim
 * dimension: _dim.length
 * value: shaped nested array of values
 * calcDim: calculates dimension vector of multidimensional array
 * calcIndex(vector): transforms vector index into flattened index
 * getValue(vector): get value in tensor at vector
 */
class Tensor {
  constructor(dimensions, fill=0, values){
    if(values){
      this._dim = this.calcDim(values);
      this._value = _.flattenDeep(values);
    } else {
      this._dim = dimensions;
      this._value = new Array(this._dim.reduce((total, val)=>{
        return total * val;
      }, 1));
      this._value.fill(fill);
    }

    this.calcIndexMemoized = _.memoize((...vector)=>{
      return vector.reduce((total, val, index)=>{
        const factor = total[1]/this._dim[index];
        return [total[0] + factor * val, factor];
      }, [0, this._value.length])[0];
    });
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
    return this.calcIndexMemoized(...vector);
  }

  assertVector(vector){
    devMode(()=>{
      assert(Array.isArray(vector), `vector ${vector} must be an array`);
      assert(vector.length === this._dim.length, `vector ${vector} must have length ${this._dim.length}`);
      assert(Number.isInteger(vector[0]), `vector ${vector} must contain integers`);
      vector.forEach((val, index)=>{
        assert(val < this._dim[index], `vector ${vector} exceeds tensor size`);
      });
    });
  }

  getValue(vector){
    this.assertVector(vector);
    return this._value[this.calcIndex(vector)];
  }

  get value(){
    return this._value;
  }
}

export {
  Tensor
};
