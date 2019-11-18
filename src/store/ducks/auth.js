export const Types = {
  AUTHENTICATE_REQUEST: 'photos/AUTHENTICATE_REQUEST',
  AUTHENTICATE_SUCCESS: 'photos/AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAILED: 'photos/AUTHENTICATE_FAILED',
};

const INITIAL_STATE = {
  authenticated: null,
  event: {
    name: null,
    date: null,
    time: null,
    location: null,
    capacity: null,
  },
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.AUTHENTICATE_REQUEST:
      return {
        ...state,
        authenticated: null,
        loading: true,
        event: { ...INITIAL_STATE.event },
      };
    case Types.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        event: { ...action.payload },
        loading: false,
      };
    case Types.AUTHENTICATE_FAILED:
      return { ...state, authenticated: false, loading: false };
    default:
      return state;
  }
}

export const Creators = {
  authenticate: token => ({
    type: Types.AUTHENTICATE_REQUEST,
    payload: token,
  }),
  authenticateSuccess: event => ({
    type: Types.AUTHENTICATE_SUCCESS,
    payload: event,
  }),
  authenticateFailed: () => ({ type: Types.AUTHENTICATE_FAILED }),
};
