import React from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Navigation from "../navigation/navigation";
import {makeStyles} from "@material-ui/core";
import Content from "../content/content";
import FavoriteDevelopers from "../content/developers/favorites/list/favoriteDevelopersContainer";
import StashDevelopers from "../content/developers/stash/list/stashDevelopersContainer";
import FavoriteRepositories from "../content/repositories/favorites/list/favoriteRepositoriesContainer";
import StashRepositories from "../content/repositories/stash/list/stashRepositoriesContainer";
import Subscribes from "../content/subscribes/list/subscribesContainer";
import {connect} from "react-redux";
import {selectIsAuth} from "../../../BLL/store/selectors/auth";
import Unauthorized from "../pages/unauthorized";
import URLS from "../../../../common/URLS";
import DevelopersTabs from "../content/developers/tabs/developersTabs";
import RepositoriesTabs from "../content/repositories/tabs/repositoriesTabs";


const history = createBrowserHistory();
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));

type AppProps = ReturnType<typeof mapStateToProps>;


const App = ({isAuth}: AppProps) => {
    const classes = useStyles();

    return (
        <Router history={history}>
            <div className={classes.root}>
                {isAuth ? (
                    <>
                        <Navigation/>
                            <Content>
                                <Route path={URLS.DEVELOPERS} component={DevelopersTabs}/>
                                <Route path={URLS.REPOSITORIES} component={RepositoriesTabs}/>

                                <Route path={URLS.FAVORITE_DEVELOPERS} component={FavoriteDevelopers}/>
                                <Route path={URLS.FAVORITE_DEVELOPERS} component={Subscribes}/>
                                <Route path={URLS.STASH_DEVELOPERS} component={StashDevelopers}/>

                                <Route path={URLS.FAVORITE_REPOSITORIES} component={FavoriteRepositories}/>
                                <Route path={URLS.FAVORITE_REPOSITORIES} component={Subscribes}/>
                                <Route path={URLS.STASH_REPOSITORIES} component={StashRepositories}/>
                                <Redirect to="/"/>
                            </Content>
                    </>
                ) : (
                    <>
                        <Route path={URLS.UNAUTHORIZED} component={Unauthorized} />
                        <Redirect to={URLS.UNAUTHORIZED}/>
                    </>
                )}
            </div>
        </Router>
    )
};

const mapStateToProps = (state: any) => ({
    isAuth: selectIsAuth(state)
});

export default connect(mapStateToProps)(App);