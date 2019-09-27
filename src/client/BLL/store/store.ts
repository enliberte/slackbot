import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import auth from './reducers/auth/auth';
import developers from './reducers/developers/developers';
import rootSaga from './sagas/rootSaga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({
        auth,
        developers,
        form: formReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;