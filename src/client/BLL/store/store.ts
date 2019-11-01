import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import auth from './reducers/auth/auth';
import developers from './reducers/developers/developers';
import repositories from './reducers/repositories/repositories';
import subscribes from "./reducers/subscribes/subscribes";
import subscribe from "./reducers/subscribes/newSubscribe";
import settings from "./reducers/settings/settings";
import rootSaga from './sagas/rootSaga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({
        auth,
        settings,
        developers,
        repositories,
        subscribes,
        subscribe,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;