import {
    AUTH_START,
    AUTH_FAILED,
    AUTH_SUCCESS,
    SIGN_UP,
    SIGN_IN_START,
    SIGN_IN_FAILED,
    SIGN_IN_SUCCESS,
    LOG_OUT
} from "../actions/types";

const initialState = {
    user: null,
    userRegistered: {},
    loggedIn: false,
    initialChecking: true,
    isReg: false,
    error: null,
    loading: true
};

const reducer = ( state = initialState, action ) => {
    const { type, user, loggedIn, error, payload } = action;
    switch ( type ) {
        case AUTH_START:
            return {
                ...state,
                initialChecking: true,
                loading: true,
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                user:            user,
                loggedIn:        true,
                initialChecking: false,
                loading:         false,
            };
        case AUTH_FAILED:
            return {
                ...state,
                error:           error,
                loggedIn:        loggedIn,
                initialChecking: false,
                loading:         false,
            };
        case SIGN_UP:
            return {
                ...state,
                userRegistered: {...state.userRegistered, ...payload},
                isReg: true,
                loggedIn: false
            };
        case SIGN_IN_START:
            return {
                ...state,
                initialChecking: true,
                loading: true
            };
        case SIGN_IN_FAILED:
            return {
                ...state,
                error,
                user: null,
                loggedIn: false
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                user: {...payload},
                isReg: true,
                loggedIn: payload.loggedIn,
                initialChecking: true,
                loading: true
            };
        case LOG_OUT:
            return {
                ...state,
                user: null,
                loggedIn: false,
                initialChecking: false,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;