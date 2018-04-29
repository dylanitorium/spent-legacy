export const where = name => ({
  is: value => ({ [name]: _value }) => _value === value,
  isNot: value => ({ [name]: _value }) => _value !== value,
  isIn: array => ({ [name]: _value }) => array.includes(_value),
  isNotIn: array => ({ [name]: _value }) => !array.includes(_value),
  value: {
    is: value => _value => _value === value,
    isNot: value => _value => _value !== value,
    isIn: array => _value => array.includes(_value),
    isNotIn: array => _value => !array.includes(_value)
  }
});

export const by = name => (a, b) => (a[name] > b[name] ? 1 : -1);

export const call = func => ({
  with: name => ({ [name]: value }) => func(value),
})

export const pluck = property => data => data[property];
