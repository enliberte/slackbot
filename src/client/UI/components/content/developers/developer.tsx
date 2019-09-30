import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {IDeveloper} from "../../../../../backend/db/models/DeveloperModel";
import {runGetSubscribesSaga} from "../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {connect} from "react-redux";
import {selectChannelId} from "../../../../BLL/store/selectors/auth";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


interface IDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    channelId: string;
    developer: IDeveloper;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const Developer = ({channelId, developer, getSubscribes, deleteDeveloper}: IDeveloperProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => getSubscribes({followed: developer.username, channelId})}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {developer.username}
                        </Typography>
                    </React.Fragment>
                }
            />
            <IconButton className={classes.button} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
};

const mapStateToProps = (state: any) => ({
    channelId: selectChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes(filters: Partial<ISubscribe>) {
        dispatch(runGetSubscribesSaga(filters));
    },
    deleteDeveloper() {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);