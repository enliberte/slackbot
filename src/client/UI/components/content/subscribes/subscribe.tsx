import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import {selectChannelId} from "../../../../BLL/store/selectors/auth";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";


interface ISubscribeProps extends ReturnType<typeof mapStateToProps> {
    subscribe: ISubscribe;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        }
    }),
);

const Subscribe = ({channelId, subscribe}: ISubscribeProps) => {
    const classes = useStyles();

    return (
        <ListItem button>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {subscribe.reponame}
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

export default connect(mapStateToProps)(Subscribe);