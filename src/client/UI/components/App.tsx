import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/navigation";
import {makeStyles} from "@material-ui/core";
import Content from "./content/content";
import Developers from "./content/developers/developers";
import Repositories from "./content/repositories/repositories";
import {connect} from "react-redux";
import {runGetAuthSaga} from "../../BLL/store/action_creators/auth/authActionCreators";
import {getIsAuth} from "../../BLL/store/selectors/auth";
import Unauthorized from "./pages/unauthorized";

const history = createBrowserHistory();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

type AppProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;


const App = ({isAuth, getAuthData}: AppProps) => {
    const classes = useStyles();
    React.useEffect(() => {
        getAuthData();
    });

    return (
        <Router history={history}>
            <div className={classes.root}>
                <Switch>
                    {isAuth ? (
                        <>
                            <Navigation/>
                                <Content>
                                <Route path="/developers" component={Developers}/>
                                <Route path="/repositories" component={Repositories}/>
                            </Content>
                        </>
                    ) : (
                        <>
                            <Route path="/undefined" component={Unauthorized} />
                            <Redirect to="/undefined"/>
                        </>
                    )}
                </Switch>

            </div>
        </Router>
    )
};

const mapStateToProps = (state: any) => ({
    isAuth: getIsAuth(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getAuthData() {
        dispatch(runGetAuthSaga())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);