import React from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {selectIsSubscribesFetching, selectSubscribes} from "../../../../BLL/store/selectors/subscribes";
import {
    runDeleteSubscribeSaga, runEditSubscribeSaga,
    runGetSubscribesSaga, runSaveSubscribeSaga,
} from "../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {
    runGetFavoriteDevelopersSaga,
    runGetStashDevelopersSaga
} from "../../../../BLL/store/action_creators/developers/developersActionCreators";
import {
    runGetFavoriteRepositoriesSaga,
    runGetStashRepositoriesSaga
} from "../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import DeveloperTextfield from './subscribeEditForm/developerTextField';
import RepositoryTextfield from './subscribeEditForm/repositoryTextField';
import {Checkbox} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SubscribesTableTitle from "./SubscribesTableTitle";
import './styles.css';


const searchInputStyles = {
    position: "absolute", top: "0px", left: "-60px", zIndex: "1000", width: "300px"
};

const SubscribesTable = (
    {
        subscribes,
        getSubscribes,
        isFetching,
        deleteSubscribe,
        updateSubscribe,
        saveSubscribe,
        getDevelopers,
        getRepositories,
        getStashDevelopers,
        getStashRepositories,
    }) => {

    const [massOperationsOpened, setMassOperationsOpened] = React.useState(false);

    React.useEffect(() => {
        getSubscribes();
        getDevelopers();
        getRepositories();
        getStashDevelopers();
        getStashRepositories();
    }, []);

    const handleRowAdd = (newData) => new Promise((resolve, reject) => {
        saveSubscribe(newData, resolve, reject);
    });

    const handleRowUpdate = (newData, oldData) => new Promise((resolve, reject) => {
        updateSubscribe(newData, resolve, reject);
    });

    const handleRowDelete = (newData, oldData) => new Promise(resolve => {
        deleteSubscribe(newData, oldData);
        resolve();
    });

    const columns = [
        {
            render: props => {
                return <Checkbox style={{padding: 0}} icon={<CheckBoxOutlineBlankIcon style={{fontSize: "1rem"}} />} checkedIcon={<CheckBoxIcon style={{fontSize: "1rem"}} />}/>
            },
            hidden: !massOperationsOpened,
            cellStyle: {width: '30px'},
            editComponent: props => <span></span>,
        },
        {
            title: 'Developer', field: 'followed', cellStyle: {width: '500px'},
            editComponent: props => <DeveloperTextfield value={props.value} onChange={props.onChange} />
        },
        {
            title: 'Repository', field: 'reponame', cellStyle: {width: '800px'},
            editComponent: props => <RepositoryTextfield value={props.value} onChange={props.onChange} />
        },
    ];

    return (
        <MaterialTable
            style={{width: '100%'}}
            title={<SubscribesTableTitle massOperationOpened={massOperationsOpened} setMassOperationOpened={setMassOperationsOpened} />}
            options={{
                pageSize: 10,
                addRowPosition: 'first',
                searchFieldAlignment: 'left',
                toolbarButtonAlignment: 'left',
                // searchFieldStyle: searchInputStyles
            }}
            columns={columns}
            data={subscribes}
            isLoading={isFetching}
            editable={{
                onRowAdd: handleRowAdd,
                onRowUpdate: handleRowUpdate,
                onRowDelete: handleRowDelete,
            }}
        />
    );
};

const mapStateToProps = state => ({
    isFetching: selectIsSubscribesFetching(state),
    subscribes: selectSubscribes(state),
});

const mapDispatchToProps = dispatch => ({
    getSubscribes() {
        dispatch(runGetSubscribesSaga());
    },
    saveSubscribe(subscribeData, resolve, reject) {
        const {followed, reponame} = subscribeData;
        dispatch(runSaveSubscribeSaga({followed, reponame}, resolve, reject));
    },
    updateSubscribe(newSubscribeData, resolve, reject) {
        const {id, followed, reponame} = newSubscribeData;
        dispatch(runEditSubscribeSaga({id, followed, reponame}, resolve, reject));
    },
    deleteSubscribe(subscribeData) {
        const {followed, reponame} = subscribeData;
        dispatch(runDeleteSubscribeSaga({followed, reponame}));
    },
    getDevelopers() {
        dispatch(runGetFavoriteDevelopersSaga());
    },
    getRepositories() {
        dispatch(runGetFavoriteRepositoriesSaga());
    },
    getStashDevelopers() {
        dispatch(runGetStashDevelopersSaga());
    },
    getStashRepositories() {
        dispatch(runGetStashRepositoriesSaga());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribesTable);