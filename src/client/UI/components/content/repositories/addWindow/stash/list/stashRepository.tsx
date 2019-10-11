import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {red} from "@material-ui/core/colors";
import {
    setSubscribe,
    toggleEditingRepositoryWindow
} from "../../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {IStashRepositoryWithFavoriteSign} from "../../../../../../../../backend/db/models/repository/stash/StashRepositoryModel";


interface IStashRepositoryProps extends ReturnType<typeof mapDispatchToProps> {
    repository: IStashRepositoryWithFavoriteSign;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inline: {
            display: 'inline',
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            '&:hover, &.active': {
                color: red[800],
            }
        }
    }),
);

const StashRepository = ({repository, setRepository}: IStashRepositoryProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => setRepository(repository.links.self[0].href)}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {repository.links.self[0].href}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    setRepository(reponame: string) {
        dispatch(setSubscribe({reponame}));
        dispatch(toggleEditingRepositoryWindow());
    }
});

export default connect(null, mapDispatchToProps)(StashRepository);