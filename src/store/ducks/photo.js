export const Types = {
  GET_REQUEST: 'photos/GET_REQUEST',
  GET_SUCCESS: 'photos/GET_SUCCESS',
  UPLOAD_REQUEST: 'photos/UPLOAD_REQUEST',
  UPLOAD_FINISHED: 'photos/UPLOAD_FINISHED',
  SAVE_REQUEST: 'photos/SAVE_REQUEST',
  SAVE_SUCCESS: 'photos/SAVE_SUCCESS',
  SAVE_FAILED: 'photos/SAVE_FAILED'
};

const INITIAL_STATE = {
  photos: [],
  
  localPhotos: [],
  loadingLocalPhotos: false,

  loading: false,
  saving: false,
  successSaved: true,
  uploading: false,
};

export default function photos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, loadingLocalPhotos: false, photos: action.payload.photos, localPhotos: action.payload.localPhotos };
    case Types.UPLOAD_REQUEST:
      return { ...state, uploading: true }
    case Types.UPLOAD_FINISHED:
      return { ...state, uploading: false }
    case Types.SAVE_REQUEST:
      return { ...state, saving: true, successSaved: false }
    case Types.SAVE_SUCCESS:
      return { ...state, saving: false, successSaved: true }
    case Types.SAVE_FAILED:
      return { ...state, saving: false, successSaved: false }
    default:
      return state;
  }
}

export const Creators = {
  getPhotos: () => ({ type: Types.GET_REQUEST }),
  getPhotosSuccess: (photos, localPhotos) => ({
    type: Types.GET_SUCCESS,
    payload: { photos, localPhotos },
  }),
  savePhoto: (photo, showOnScreen) => ({
    type: Types.SAVE_REQUEST,
    payload: { photo, showOnScreen }
  }),
  savePhotoSuccess: () => ({ type: Types.SAVE_SUCCESS }),
  savePhotoFailed: () => ({ type: Types.SAVE_FAILED }),
  uploadPhotos: () => ({ type: Types.UPLOAD_REQUEST }),
  uploadFinished: () => ({ type: Types.UPLOAD_FINISHED })
};
