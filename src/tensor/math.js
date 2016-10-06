import _ from 'lodash';

////////////
// Vector //
////////////

const dot = (vector1, vector2)=>{
  let k = 0;
  for(let i = 0; i < vector1.length; i++){
    k += vector1[i] * vector2[i];
  }
  return k;
};

const scale = (vector, scalar, clone=false)=>{
  let k = vector;
  if(clone){
    k = _.clone(k);
  }
  for(let i = 0; i < k.length; i++){
    k[i] *= scalar;
  }
  return k;
};

const vector = {
  dot, scale
};

////////////
// Matrix //
////////////

const mDot = (matrix1, matrix2)=>{

};

const matrix = {
  mDot
};

//////////
// Math //
//////////

const math = {
  vector, matrix
};

export {
  math as default,
  vector, matrix
};
