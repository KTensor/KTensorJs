import _ from 'lodash';

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

export {
  vector as default,
  dot, scale
};
