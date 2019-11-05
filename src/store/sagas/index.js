import { all, takeLatest } from 'redux-saga/effects'

import { Types as PhotoTypes } from '../ducks/photo'
import { getPhotos, savePhoto, uploadPhotos } from './photo'

import { Types as AuthTypes } from '../ducks/auth'
import { authenticate } from './auth'

export default function* rootSaga() {
    yield all([
        takeLatest(PhotoTypes.GET_REQUEST, getPhotos),
        takeLatest(PhotoTypes.SAVE_REQUEST, savePhoto),
        takeLatest(PhotoTypes.UPLOAD_REQUEST, uploadPhotos),
        takeLatest(AuthTypes.AUTHENTICATE_REQUEST, authenticate)
    ])
}