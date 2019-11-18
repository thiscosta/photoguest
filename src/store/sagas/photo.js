import { call, put } from 'redux-saga/effects';
import service from '../../services/photoService';
import { Creators as PhotoActions } from '../ducks/photo';
import { Creators as ErrorActions } from '../ducks/error';

export function* getPhotos() {
    try {
        const resultRemotePhotos = yield call(service.getPhotos);
        const resultLocalPhotos = yield call(service.getLocalPhotos);

        if (resultRemotePhotos.success) {
            yield put(PhotoActions.getPhotosSuccess(resultRemotePhotos.data, resultLocalPhotos));
            return
        }

        yield put(PhotoActions.getPhotosSuccess([], resultLocalPhotos));
        yield put(ErrorActions.addError("Erro ao buscar fotos do servidor"))
        return

    } catch (err) {
        yield put(ErrorActions.addError("Erro ao buscar fotos do servidor. " + err))
    }
}

export function* savePhoto(action) {
    try {
        const result = yield call(service.savePhoto, action.payload.photo, action.payload.showOnScreen)

        if (result.success) {
            yield put(PhotoActions.savePhotoSuccess())
            return;
        }
        if (result.errorCode == 303) {
            yield put(PhotoActions.savePhotoFailed())
            yield put(ErrorActions.addError("O número limite de fotos foi atingido"))
            return;
        }

        yield put(PhotoActions.savePhotoFailed())
        yield put(ErrorActions.addError(result.message))

    } catch (err) {
        yield put(PhotoActions.savePhotoFailed())
        yield put(ErrorActions.addError(err.toString()))
    }
}

export function* removePhoto(action) {
    try {
        const result = yield call(service.deletePhoto, action.payload.photo)

        if (result.success) {
            yield put(PhotoActions.deletePhotoSuccess())
            yield put(PhotoActions.getPhotos())
            return;
        }

        yield put(PhotoActions.deletePhotoFailed())
        yield put(ErrorActions.addError("Não foi possível excluir a foto, por favor, tente novamente"))

    } catch (err) {
        yield put(PhotoActions.deletePhotoFailed())
        yield put(ErrorActions.addError(err.toString()))
    }
}

export function* uploadPhotos() {
    try {
        const result = yield call(service.uploadPhotos)
    } catch (err) {
        yield put(ErrorActions.addError(err.toString()))
    }
}
