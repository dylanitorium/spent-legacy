//filter
export const where = name => ({
  is: value => ({ [name]: _value }) => _value === value,
  isNot: value => ({ [name]: _value }) => _value !== value,
  isGreaterThan: value => ({ [name]: _value }) => _value > value,
  isLessThan: value => ({ [name]: _value }) => _value < value,
  isIn: array => ({ [name]: _value }) => array.includes(_value),
  isNotIn: array => ({ [name]: _value }) => !array.includes(_value),
  isUnique: ({ [name]: value }, index, array) => (
    typeof array.find(({ [name]: _value}, _index) => value === _value && index !== _index ) === 'undefined'
  ),
  isNegative: ({ [name]: value }) => is(parseInt(value, 10)).negative,
  isPositive: ({ [name]: value }) => is(parseInt(value, 10)).positive,
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

// Combine queries with "and"
export const combineQueries = (queries) => (
  arg => queries.reduce((previousResult, query) => (query(arg) && previousResult), true)
);

//sort

// Sort objects by a property
export const by = name => (a, b) => (a[name] > b[name] ? 1 : -1);

//map

// Call a function mapping over objects
export const call = func => ({
  // on a property (better used in forEach)
  with: name => ({ [name]: value }) => func(value),
  // mutating a particular property
  on: name => (item) => ({ ...item, [name]: func(item[name]) }),
});

// When mapping pass the array item though an array of mutating functions
export const through = array => item => array.reduce((_item, func) => func(_item), item);

// Reduce an array of objects to an array of objects of a single property
export const select = property => data => ({ [property]: data[property] });

// Return a map of just one property
export const pluck = property => ({ [property]: value }) => value;

//reduce

// Sum the property of an array of objects
export const sum = name => (accumulator, { [name]: value }) => value + accumulator;

// Combine arrays from a property in an array of objects
export const combine = name => (accumulator, { [name]: value }) => [...accumulator, ...value];

//value
export const is = value => ({
  positive: value > 0,
  negative: value < 0,
})
