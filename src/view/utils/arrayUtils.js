export const where = name => ({
  is: value => ({ [name]: _value }) => _value === value,
  isNot: value => ({ [name]: _value }) => _value !== value,
  isGreaterThan: value => ({ [name]: _value }) => _value > value,
  isLessThan: value => ({ [name]: _value }) => _value < value,
  isIn: array => ({ [name]: _value }) => array.includes(_value),
  isNotIn: array => ({ [name]: _value }) => !array.includes(_value),
  value: {
    is: value => _value => _value === value,
    isNot: value => _value => _value !== value,
    isIn: array => _value => array.includes(_value),
    isNotIn: array => _value => !array.includes(_value),
    passedThrough: func => ({
      is: value => _value => func(_value) === value,
      isNot: value => _value => func(_value) !== value,
      isIn: array => _value => array.includes(func(_value)),
      isNotIn: array => _value => !array.includes(func(_value))
    })
  },
  passedThrough: func => ({
    is: value => ({ [name]: _value }) => func(_value) === value,
    isNot: value => ({ [name]: _value }) => func(_value) !== value,
    isGreaterThan: value => ({ [name]: _value }) => func(_value) > value,
    isLessThan: value => ({ [name]: _value }) => func(_value) < value,
    isIn: array => ({ [name]: _value }) => array.includes(func(_value)),
    isNotIn: array => ({ [name]: _value }) => !array.includes(func(_value)),
  })
});

export const combineQueries = (queries) => (
  arg => queries.reduce((previousResult, query) => (query(arg) && previousResult), true)
);

export const by = name => (a, b) => (a[name] > b[name] ? 1 : -1);

export const call = func => ({
  with: name => ({ [name]: value }) => func(value),
  on: name => (item) => ({ ...item, [name]: func(item[name]) }),
});

export const select = property => data => ({ [property]: data[property] });

export const sum = name => (accumulator, { [name]: value }) => value + accumulator;
