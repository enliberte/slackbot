import React from 'react';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Accordeon from "../accordeon/accordeon";
import {makeStyles} from "@material-ui/core";
import Content from "../content/content";
import {connect} from "react-redux";
import {
    selectIsAuth,
    selectIsAuthFetching,
    selectIsSessionWarningMsgDisplayed,
    selectIsStashDeveloper, selectSessionEndWarningMsg
} from "../../../BLL/store/selectors/auth";
import Unauthorized from "../pages/unauthorized/unauthorized";
import URLS from "../../../../common/URLS";
// @ts-ignore
import RepositoriesTable from "../content/repositories/stash/RepositoriesTable";
// @ts-ignore
import DevelopersTable from "../content/developers/stash/DevelopersTable";
// @ts-ignore
import SubscribesTable from "../content/subscribes/SubscribesTable";
import {runGetAuthSaga, setSessionEndWarning} from "../../../BLL/store/action_creators/auth/authActionCreators";
import AdminCircular from "../common/loader/circular/circular";
import SettingsPanel from "../content/settings/SettingsPanel";
import AdminWarningSnackbar from "../common/snackbars/snackbar";


const history = createBrowserHistory();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

type AppProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;


const App = ({isAuth, isStashDeveloper, isAuthFetching, getAuthData, isSnackbarDisplayed, snackbarText}: AppProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        getAuthData();
    }, []);

    return (
        <Router history={history}>
            <div className={classes.root}>
                {isAuthFetching ? <AdminCircular /> :
                    isAuth ? (
                        <>
                            <AdminWarningSnackbar open={isSnackbarDisplayed} message={snackbarText}/>
                            <Accordeon isStashDeveloper={isStashDeveloper}/>
                                <Content>
                                    {!isStashDeveloper && <Redirect to={URLS.SETTINGS}/>}
                                        <Switch>
                                            <Route path={URLS.DEVELOPERS} component={DevelopersTable}/>
                                            <Route path={URLS.REPOSITORIES} component={RepositoriesTable}/>
                                            <Route path={URLS.SETTINGS} component={SettingsPanel}/>
                                            <Route path={URLS.SUBSCRIBES} component={SubscribesTable}/>
                                        </Switch>
                                </Content>
                        </>
                    ) : (
                        <>
                            <Route path={URLS.UNAUTHORIZED} component={Unauthorized} />
                            <Redirect to={URLS.UNAUTHORIZED}/>
                        </>
                    )
                }
            </div>
        </Router>
    )
};

const mapStateToProps = (state: any) => ({
    isAuth: selectIsAuth(state),
    isSnackbarDisplayed: selectIsSessionWarningMsgDisplayed(state),
    snackbarText: selectSessionEndWarningMsg(state),
    isStashDeveloper: selectIsStashDeveloper(state),
    isAuthFetching: selectIsAuthFetching(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getAuthData() {
        dispatch(runGetAuthSaga());
    },
    closeSnackbar() {
        dispatch(setSessionEndWarning({sessionEndWarningMsg: '', isSessionWarningMsgDisplayed: false}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);