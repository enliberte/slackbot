import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import {ISubscribe} from "../../../../../backend/db/models/SubscribeModel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";


interface ISubscribeProps extends ReturnType<typeof mapDispatchToProps> {
    subscribe: ISubscribe;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        }
    }),
);

const Subscribe = ({subscribe, deleteSubscribe}: ISubscribeProps) => {
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
            <IconButton
                size="small"
                className={classes.button} aria-label="delete"
                onClick={() => deleteSubscribe({reponame: subscribe.reponame})}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    deleteSubscribe(filters: Partial<ISubscribe>) {
        // dispatch(runDeleteSubscribeSaga(filters))
    }
});

export default connect(null, mapDispatchToProps)(Subscribe);