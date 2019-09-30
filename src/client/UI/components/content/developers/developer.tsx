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


interface IDeveloperProps extends ReturnType<typeof mapDispatchToProps> {
    channelId: string;
    developer: IDeveloper;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        }
    }),
);

const Developer = ({channelId, developer, getSubscribes}: IDeveloperProps) => {
    const classes = useStyles();

    return (
        <ListItem>
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                        <Typography
                            onClick={() => getSubscribes({followed: developer.username, channelId})}
                        >
                            {developer.username}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
};

const mapStateToProps = (state: any) => ({
    channelId: selectChannelId(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    getSubscribes(filters: Partial<ISubscribe>) {
        dispatch(runGetSubscribesSaga(filters));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Developer);