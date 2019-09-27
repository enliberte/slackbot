import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/navigation";
import {makeStyles} from "@material-ui/core";
import Content from "./content/content";
import Developers from "./developers/developers";
import Repositories from "./repositories/repositories";

const history = createBrowserHistory();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));


const App = () => {
    const classes = useStyles();

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

export default App;