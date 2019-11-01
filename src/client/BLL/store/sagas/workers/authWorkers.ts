import {put, call, select, delay, spawn, take} from 'redux-saga/effects';
import store from "../../store";
import {fetchGetAuth, fetchPostStashUser, fetchRefreshToken} from "../../../API/authAPI";
import {
    runRefreshSaga,
    setAuthData, setExp,
    setIsAuthFetching, setLogout,
    setSessionEndWarning,
    setStashUserData
} from "../../action_creators/auth/authActionCreators";
import {
    IRunAddStashUserSagaAction,
    ISetAuthDataAction
} from "../../action_creators/auth/IAuthActions";
import {selectChannelId, selectExp, selectIsAuth} from "../../selectors/auth";
import {
    clearSaveSettingsError,
    setSaveSettingsError,
    setSaveSuccessDisplayed
} from "../../action_creators/settings/settingsActionCreators";
import EM from "../../../../../backend/services/ServiceErrorMessages";


function* logout(delayTime: number): any {
    yield delay(delayTime);
    const exp = yield select(selectExp);
    if (exp > Math.floor(Date.now() / 1000)) {
        yield spawn(logout((exp - Math.floor(Date.now() / 1000)) * 1000));
    } else {
        yield put(setLogout());
    }
}

const startRefresh = () => {
    store.dispatch(runRefreshSaga());
};

export function* refreshToken() {
    document.removeEventListener('mousemove', startRefresh);
    try {
        const response = yield call(fetchRefreshToken);
        yield put(setExp(response.data));
        yield put(setSessionEndWarning({isSessionWarningMsgDisplayed: false, sessionEndWarningMsg: ''}));
        yield spawn(delayRefreshToken, 300000);
    } catch (err) {
        console.log(err);
    }
}

function* delayRefreshToken(delayTime: number): any {
    yield delay(delayTime);
    const isAuth = select(selectIsAuth);
    if (isAuth) {
        document.addEventListener('mousemove', startRefresh);
        const exp = yield select(selectExp);
        if (exp - Math.floor(Date.now() / 1000) <= 300) {
            yield put(setSessionEndWarning({
                isSessionWarningMsgDisplayed: true,
                sessionEndWarningMsg: 'The session will expire in less than 5 minutes. To avoid that move a mouse'
            }));
        } else {
            yield spawn(delayRefreshToken, 300000);
        }
    }
}

export function *getAuth(action: ISetAuthDataAction) {
    try {
        yield put(setIsAuthFetching(true));
        const response = yield call(fetchGetAuth);
        const exp = response.data.exp;
        yield put(setAuthData({...response.data, isAuth: true}));
        yield spawn(delayRefreshToken, 300000);
        yield spawn(logout, (exp - Math.floor(Date.now() / 1000)) * 1000);
    } catch (err) {
        console.log(err);
    } finally {
        yield put(setIsAuthFetching(false));
    }
}

export function *addStashUser(action: IRunAddStashUserSagaAction) {
    try {
        const channelId = yield select(selectChannelId);
        const {stashDisplayName, commentsNotifications = false, reviewNotifications = false, subscribesNotifications = false} = action.payload;
        const response = yield call(fetchPostStashUser, {channelId, stashDisplayName, commentsNotifications, reviewNotifications, subscribesNotifications});
        yield put(setSaveSuccessDisplayed(true));
        yield put(setStashUserData(response.data));
        yield put(clearSaveSettingsError());
    } catch (err) {
        console.log(err);
        yield put(setSaveSettingsError(EM.DEVELOPER_NOT_FOUND));
    } finally {
        yield put(setIsAuthFetching(false));
    }
}