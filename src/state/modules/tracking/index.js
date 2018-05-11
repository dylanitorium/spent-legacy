import { FREQUENCY_MAP } from 'state/constants';

const actionTypes = {
  SET_TRACKING_PERIOD: 'spent/app/tracking/set/period',
};

export const actions = {
  setTrackingPeriod: (period) => ({
    type: actionTypes.SET_TRACKING_PERIOD,
    period,
  })
};

const initialState = {
  trackingPeriod: FREQUENCY_MAP.WEEK
};

export const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_TRACKING_PERIOD:
      return {
        ...state,
        trackingPeriod: action.period,
      };
    default:
      return state;
  }
}
