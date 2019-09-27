import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import example from './reducers/example';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({
        example,
        form: formReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export default store;