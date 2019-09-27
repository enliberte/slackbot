import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/navigation";
import {makeStyles} from "@material-ui/core";
import Content from "./content/content";
import Developers from "./developers/developers";
import Repositories from "./repositories/repositories";
import {connect} from "react-redux";
import {runGetAuthSaga} from "../../BLL/store/action_creators/auth/authActionCreators";

const history = createBrowserHistory();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

type AppProps = ReturnType<typeof mapDispatchToProps>


const App = ({getAuthData}: AppProps) => {
    const classes = useStyles();
    React.useEffect(() => {
        getAuthData();
    });

    return (
        <Router history={history}>
            <div className={classes.root}>
                <Navigation/>
                <Content>
                    <Route path="/developers" component={Developers}/>
                    <Route path="/repositories" component={Repositories}/>
                </Content>
            </div>
        </Router>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    getAuthData() {
        dispatch(runGetAuthSaga())
    }
});

export default connect(null, mapDispatchToProps)(App);