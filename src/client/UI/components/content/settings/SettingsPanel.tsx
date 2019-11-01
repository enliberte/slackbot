import React from 'react';
import {connect} from "react-redux";
import SettingsEditForm from "./settingsEditForm/SettingsEditForm";
import Paper from '@material-ui/core/Paper';
import {Snackbar, Typography} from "@material-ui/core";
import useStyles from "./styles";
import {runGetStashDevelopersSaga} from "../../../../BLL/store/action_creators/developers/developersActionCreators";
import {selectIsSaveSuccessDisplayed} from "../../../../BLL/store/selectors/settings";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {setSaveSuccessDisplayed} from "../../../../BLL/store/action_creators/settings/settingsActionCreators";


type SettingsPanelProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;
const SettingsPanel = ({getStashDevelopers, isSaveSuccessDisplayed, closeSaveSuccess}: SettingsPanelProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        closeSaveSuccess();
        getStashDevelopers();
    }, []);

    return (
        <>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3" style={{marginBottom: '20px'}}>Settings</Typography>
                <SettingsEditForm />
            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isSaveSuccessDisplayed}
                autoHideDuration={3000}
                onClose={closeSaveSuccess}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Settings saved successfully</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={closeSaveSuccess}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </>
    );
};

const mapStateToProps = (state: any) => ({
    isSaveSuccessDisplayed: selectIsSaveSuccessDisplayed(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getStashDevelopers() {
        dispatch(runGetStashDevelopersSaga());
    },
    closeSaveSuccess() {
        dispatch(setSaveSuccessDisplayed(false));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);