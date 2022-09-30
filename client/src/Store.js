import {combineReducers,
    legacy_createStore} from "redux"
import {applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import auth from "./reducer/auth"

import  posts  from "./reducer/postreducer"

const rootReducer = combineReducers({posts,auth})

export const store =legacy_createStore(rootReducer,applyMiddleware(thunk))