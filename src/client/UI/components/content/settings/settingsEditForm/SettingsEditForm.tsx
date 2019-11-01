import React, {ChangeEvent} from 'react';
import AdminTextField from "../../../common/textfields/textfield/textfield";
import {selectStashDevelopersSuggests} from "../../../../../BLL/store/selectors/developers";
import {connect} from "react-redux";
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {INewUser} from "../../../../../../backend/db/models/user/UserModel";
import {runAddStashUserSaga} from "../../../../../BLL/store/action_creators/auth/authActionCreators";
import {
    selectIsCommentsNotifications, selectIsReviewNotifications,
    selectIsSubscribesNotifications,
    selectStashDisplayName
} from "../../../../../BLL/store/selectors/auth";
import {
    selectIsStashDisplayNameError,
    selectStashDisplayNameErrorText
} from "../../../../../BLL/store/selectors/settings";

type SettingsEditFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const SettingsEditForm = ({saveUser, developersSuggests, isStashDeveloperError, stashDeveloperErrorText, stashName, isReviewNotifications, isCommentsNotifications, isSubscribesNotifications}: SettingsEditFormProps) => {
    const [stashDisplayName, setStashDisplayName] = React.useState(stashName);
    const [commentsNotifications, setCommentsNotifications] = React.useState(isCommentsNotifications);
    const [reviewNotifications, setReviewNotifications] = React.useState(isReviewNotifications);
    const [subscribesNotifications, setSubscribesNotifications] = React.useState(isSubscribesNotifications);
    const label = isStashDeveloperError ? stashDeveloperErrorText : "Stash developer name";

    const checkboxes = [
        {label: 'Notify about new pull requests according to your subscriptions', checked: subscribesNotifications, onChange: setSubscribesNotifications},
        {label: 'Notify about pull requests where you was mentioned in comments', checked: commentsNotifications, onChange: setCommentsNotifications},
        {label: 'Notify about new pull requests where you was selected as reviewer', checked: reviewNotifications, onChange: setReviewNotifications}
    ];

    return (
        <Grid container direction="column" spacing={3}>
            <Grid item>
                <AdminTextField
                    value={stashDisplayName}
                    onChange={(newValue: string) => setStashDisplayName(newValue)}
                    focused={true}
                    isValid={!isStashDeveloperError}
                    label={label}
                    data={developersSuggests} />
            </Grid>
            {checkboxes.map(checkbox => (
                <Grid item>
                    <FormControlLabel
                        label={checkbox.label}
                        control={
                            <Checkbox
                                checked={checkbox.checked}
                                onChange={() => checkbox.onChange(!checkbox.checked)}
                            />
                        }
                    />
                </Grid>
            ))}
            <Grid item>
                <Button
                    onClick={() => saveUser({stashDisplayName, commentsNotifications, reviewNotifications, subscribesNotifications})}
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
};

const mapStateToProps = (state: any) => ({
    isStashDeveloperError: selectIsStashDisplayNameError(state),
    stashDeveloperErrorText: selectStashDisplayNameErrorText(state),
    stashName: selectStashDisplayName(state),
    isCommentsNotifications: selectIsCommentsNotifications(state),
    isSubscribesNotifications: selectIsSubscribesNotifications(state),
    isReviewNotifications: selectIsReviewNotifications(state),
    developersSuggests: selectStashDevelopersSuggests(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    saveUser(userData: INewUser) {
        dispatch(runAddStashUserSaga(userData));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditForm);