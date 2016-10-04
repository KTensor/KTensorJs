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

### methods

- **getValue(vector)**
  - vector: array
  - returns: value in tensor at vector
- **getValueExplicit(index)**
  - index: integer
  - returns: value in flattened tensor array at index
