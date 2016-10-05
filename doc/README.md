# Documentation

## K.t.Tensor

##### constructor

```js
new K.t.Tensor(dimensions [, fill]);
new K.t.Tensor(null, null, *multidimensional_array*);
```

### properties

- **type** - returns 'tensor'
- **dimensions** - dimension vector
- **value** - multidimensional array of values
- **val** - copy of array of values
- **valref** - direct reference to the array

### methods

- **getValue(vector)**
  - vector: array
  - returns: value in tensor at vector
- **getValueExplicit(index)**
  - index: integer
  - returns: value in flattened tensor array at index
- **getValues(vector1, vector2)**
  - vector1: array
  - vector2: array
  - returns: array of values in tensor bounded by indicies vector1 and vector2
