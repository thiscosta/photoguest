export const Types = {
    NEW_ERROR: 'photos/NEW_ERROR',
    DISMISS_ERROR: 'photos/DISMISS_ERROR',
};

const INITIAL_STATE = {
    error: false,
    errorMessage: ""
}

export default function error(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.NEW_ERROR:
            return { ...state, error: true, errorMessage: action.payload.error }
        case Types.DISMISS_ERROR:
            return { ...state, error: false, errorMessage: "" }
        default:
            return state
    }
}

export const Creators = {
    addError: error => ({
        type: Types.NEW_ERROR,
        payload: { error }
    }),
    dismissError: () => ({ type: Types.DISMISS_ERROR }),
}