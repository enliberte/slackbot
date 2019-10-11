import React from 'react';
import {connect} from "react-redux";
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    selectIsDeveloperEditing,
    selectIsRepositoryEditing,
    selectSubscribe
} from "../../../../../../BLL/store/selectors/subscribes";
import TocIcon from '@material-ui/icons/Toc';
import DialogWindow from "../../../dialog/dialog";
import AddRepositoryPanel from "../../../repositories/addWindow/addRepositoryPanel";
import {
    runSaveSubscribeSaga,
    setSubscribe, toggleEditingDeveloperWindow,
    toggleEditingRepositoryWindow
} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import AddDeveloperPanel from "../../../developers/addWindow/addDeveloperPanel";
import SaveIcon from '@material-ui/icons/Save';


type SubscribeEditingFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '440px',
        },
        button: {
            margin: theme.spacing(3),
        }
    }),
);

const SubscribeEditingForm = (
    {subscribe, setRepository, setDeveloper, isRepositoryPanelDisplayed, isDeveloperPanelDisplayed, toggleAddRepositoryPanel, toggleAddDeveloperPanel}: SubscribeEditingFormProps
) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    id="followed"
                    label="Developer"
                    className={classes.textField}
                    value={subscribe.followed}
                    onChange={setDeveloper}
                    margin="normal"
                />
                <IconButton
                    size="small"
                    className={classes.button} aria-label="add-developer"
                    onClick={toggleAddDeveloperPanel}>
                    <TocIcon />
                </IconButton>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="repository"
                    label="Repository"
                    className={classes.textField}
                    value={subscribe.reponame}
                    onChange={setRepository}
                    margin="normal"
                />
                <IconButton
                    size="small"
                    className={classes.button} aria-label="add-repository"
                    onClick={toggleAddRepositoryPanel}>
                    <TocIcon />
                </IconButton>
            </Grid>

            <DialogWindow
                dialogTitle="Select repository"
                open={isRepositoryPanelDisplayed}
                handleClose={toggleAddRepositoryPanel}
                actions={[{text: 'Cancel', onClick: toggleAddRepositoryPanel}]}>
                <AddRepositoryPanel />
            </DialogWindow>

            <DialogWindow
                dialogTitle="Select developer"
                open={isDeveloperPanelDisplayed}
                handleClose={toggleAddDeveloperPanel}
                actions={[{text: 'Cancel', onClick: toggleAddDeveloperPanel}]}>
                <AddDeveloperPanel />
            </DialogWindow>
        </Grid>
    )
};

const mapStateToProps = (state: any) => ({
    isRepositoryPanelDisplayed: selectIsRepositoryEditing(state),
    isDeveloperPanelDisplayed: selectIsDeveloperEditing(state),
    subscribe: selectSubscribe(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleAddRepositoryPanel() {
        dispatch(toggleEditingRepositoryWindow());
    },
    toggleAddDeveloperPanel() {
        dispatch(toggleEditingDeveloperWindow());
    },
    setRepository(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setSubscribe({reponame: event.target.value}));
    },
    setDeveloper(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setSubscribe({followed: event.target.value}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeEditingForm);