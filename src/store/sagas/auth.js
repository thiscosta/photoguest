
import { call, put } from 'redux-saga/effects'

import { tryAuth } from '../../services/auth'

import { Creators as AuthActions } from '../ducks/auth'

export function* authenticate(action) {
    try {
        const response = yield call(tryAuth, action.payload)

        if (response.success)
            yield put(AuthActions.authenticateSuccess())
        else
            yield put(AuthActions.authenticateFailed())

    } catch (err) {
        yield put(ErrorActions.setError("Não foi possível fazer login. " + err.toString()))
    }
}