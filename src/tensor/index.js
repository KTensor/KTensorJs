import _ from 'lodash';
import {devMode} from 'utility';

class Tensor {
  constructor(dimensions, fill=0){
    this._dim = dimensions;
    this._value = new Array(this._dim.reduce((total, val)=>{
      return total * val;
    }, 1));
    this._value.fill(fill);

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

  value(vector){
    assertVector(vector);
    return this._value[this.calcIndex(vector)];
  }

  setValue(vector, value){
    assertVector(vector);
    this._value[this.calcIndex(vector)] = value;
  }
}

export {
  Tensor
};
