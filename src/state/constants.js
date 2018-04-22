export const FREQUENCY = [
  'WEEK',
  'FORTNIGHT',
  'MONTH',
  'YEAR',
];

export const FREQUENCY_MAP = {
  WEEK: 'WEEK',
  FORTNIGHT: 'FORTNIGHT',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
}

export const FREQUENCY_LABELS = {
  WEEK: 'Weekly',
  FORTNIGHT: 'Fortnightly',
  MONTH: 'Monthly',
  YEAR: 'Yearly',
};

export const FREQUENCIES_FACTORS = {
  WEEK: 52,
  FORTNIGHT: 26,
  MONTH: 12,
  YEAR: 1,
};

export const FREQUENCY_OPTIONS = FREQUENCY.map(f => ({
  key: f,
  text: FREQUENCY_LABELS[f],
  value: f,
}))
