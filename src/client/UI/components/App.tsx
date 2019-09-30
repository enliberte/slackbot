import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/navigation";
import {makeStyles} from "@material-ui/core";
import Content from "./content/content";
import Developers from "./content/developers/developersContainer";
import Repositories from "./content/repositories/repositoryContainer";
import {connect} from "react-redux";
import {runGetAuthSaga} from "../../BLL/store/action_creators/auth/authActionCreators";
import {selectIsAuth} from "../../BLL/store/selectors/auth";
import Unauthorized from "./pages/unauthorized";
import ItemTabs from "./content/tabs/tabs";

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
                {isAuth ? (
                    <>
                        <Navigation/>
                            <Content>
                                <ItemTabs />
                                <Route path="/developers" component={Developers}/>
                                <Route path="/repositories" component={Repositories}/>
                                <Redirect to="/"/>
                            </Content>
                    </>
                ) : (
                    <>
                        <Route path="/unauthorized" component={Unauthorized} />
                        <Redirect to="/unauthorized"/>
                    </>
                )}
            </div>
        </Router>
    )
};

const mapStateToProps = (state: any) => ({
    isAuth: selectIsAuth(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getAuthData() {
        dispatch(runGetAuthSaga())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);