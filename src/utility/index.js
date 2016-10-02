const conditional = (condition, func)=>{
  if(condition){
    func();
  }
};

const devMode = (func)=>{
  conditional(process.env.NODE_ENV === 'production', func);
};

export {
  conditional, devMode
};
