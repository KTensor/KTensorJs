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

const inconsistent = (vector1, vector2)=>{
  for(let i = 0; i < vector1.length; i++){
    if(vector1[i] > vector2[i]){
      return i;
    }
  }
  return -1;
};

// NEED TO IMPLEMENT INCREMENT

const increment = (vector, amount, cap)=>{
  vector[vector.length - 1] += 1;
  let num = inconsistent(vector, vector2);
  while(num > -1){
    vector[num] = vector1[num];
    vector[num-1] += 1;
    num = inconsistent(vector, vector2);
  }
};

const calcIndiciesMemoized = _.memoize(
  (arrLength, dimensions, vector)=>{
    const finalIndex = calcIndexMemoized(arrLength, dimensions, vector);
    const indicies = [];
    const k = new Array(vector.length);
    for(let i = 0; i < k.length; i++){
      k[i] = 0;
    }
    indicies.push(0);
    increment(k, 1, vector);
    let index = calcIndexMemoized(arrLength, dimensions, k);
    while(index < finalIndex){
      indicies.push(index);
      increment(k, vector1, vector2);
      index = calcIndexMemoized(arrLength, dimensions, k);
    }
    indicies.push(finalIndex);
    return indicies;
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

  getValueExplicit(index){
    return this._value[index];
  }

  getIndicies(vector1, vector2){
    this.assertVector(vector1);
    this.assertVector(vector2);
    const difference = new Array(vector1.length);
    let zeroed = true;
    for(let i = 0; i < difference.length; i++){
      const k = vector2[i] - vector1[i];
      difference[i] = k;
      if(k !== 0){
        zeroed = false;
      }
    }
    if(zeroed){
      return [calcIndexMemoized(this._value.length, this._dim, vector1)];
    }
    devMode(()=>{
      for(let i = 0; i < difference.length; i++){
        assert(difference[i] > -1);
      }
    });
    return calcIndiciesMemoized(this._value.length, this._dim, difference);
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
