import { combineReducers } from 'redux'

import photo from './photo'
import auth from './auth'
import error from './error'

export default combineReducers({
    photo, auth, error
})