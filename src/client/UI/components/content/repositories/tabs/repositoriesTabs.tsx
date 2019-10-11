import React from 'react';
import URLS from "../../../../../../common/URLS";
import ItemTabs from "../../../navigation/tabs/tabs";
import {RouteComponentProps, withRouter} from 'react-router-dom';


const RepositoriesTabs = ({history}: RouteComponentProps) => {
    return (
        <ItemTabs tabs={[
            {label: 'FAVORITES', clickHandler: () => history.push(URLS.FAVORITE_REPOSITORIES)},
            {label: 'ALL', clickHandler: () => history.push(URLS.STASH_REPOSITORIES)}
        ]} />
    );
};

export default withRouter(RepositoriesTabs);