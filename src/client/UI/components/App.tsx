import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
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
                <Route path="/unauthorized" component={Unauthorized}/>
                {!isAuth && <Redirect to={{pathname: '/unauthorized'}} />}
                <Navigation/>
                <Content>
                    <Route path="/developers" component={Developers}/>
                    <Route path="/repositories" component={Repositories}/>
                </Content>
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