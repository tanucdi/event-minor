import {applyMiddleware,createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware=[thunk]
const devTools=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer,devTools(
    applyMiddleware(...middleware)
))
