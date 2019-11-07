
import { call, put } from 'redux-saga/effects'

import { tryAuth } from '../../services/auth'

import { Creators as AuthActions } from '../ducks/auth'
import { Creators as ErrorActions } from '../ducks/error'

export function* authenticate(action) {
    try {
        const response = yield call(tryAuth, action.payload)

        if (response.success)
            yield put(AuthActions.authenticateSuccess(response.data))
        else
            yield put(AuthActions.authenticateFailed())

    } catch (err) {
        yield put(AuthActions.authenticateFailed())
        yield put(ErrorActions.addError("Não foi possível fazer login. " + err.toString()))
    }
}