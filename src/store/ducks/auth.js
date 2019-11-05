export const Types = {
    AUTHENTICATE_REQUEST: 'photos/AUTHENTICATE_REQUEST',
    AUTHENTICATE_SUCCESS: 'photos/AUTHENTICATE_SUCCESS',
    AUTHENTICATE_FAILED: 'photos/AUTHENTICATE_FAILED',
};

const INITIAL_STATE = {
    authenticated: null,
    loading: false
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.AUTHENTICATE_REQUEST:
            return { ...state, authenticated: null, loading: true }
        case Types.AUTHENTICATE_SUCCESS:
            return { ...state, authenticated: true, loading: false }
        case Types.AUTHENTICATE_FAILED:
            return { ...state, authenticated: false, loading: false }
        default:
            return state
    }
}

export const Creators = {
    authenticate: token => ({
        type: Types.AUTHENTICATE_REQUEST,
        payload: token
    }),
    authenticateSuccess: () => ({ type: Types.AUTHENTICATE_SUCCESS }),
    authenticateFailed: () => ({ type: Types.AUTHENTICATE_FAILED })
}