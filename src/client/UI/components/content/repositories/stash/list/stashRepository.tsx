import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {red} from "@material-ui/core/colors";
import {
    runAddStashRepositoryToFavoritesSaga,
    runDeleteFavoriteRepositorySaga
} from "../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import {IStashRepositoryWithFavoriteSign} from "../../../../../../../backend/db/models/repository/stash/StashRepositoryModel";


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

const StashRepository = ({repository, addStashRepositoryToFavorites, removeStashRepositoryFromFavorites}: IStashRepositoryProps) => {
    const classes = useStyles();
    const [isActive, setIsActive] = React.useState(repository.isFavorite);
    const activityClass = isActive ? 'active' : 'passive';

    const handleClick = (): void => {
        if (isActive) {
            removeStashRepositoryFromFavorites(repository.links.self[0].href);
        } else {
            addStashRepositoryToFavorites(repository.links.self[0].href);
        }
        setIsActive(!isActive);
    };

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
                            {repository.links.self[0].href}
                        </Typography>
                    </React.Fragment>
                }
            />
            <IconButton
                size="small"
                className={classes.button} aria-label="to_favorites"
                onClick={handleClick}>
                <StarBorderIcon className={`${classes.icon} ${activityClass}`} />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    addStashRepositoryToFavorites(reponame: string) {
        dispatch(runAddStashRepositoryToFavoritesSaga(reponame));
    },
    removeStashRepositoryFromFavorites(reponame: string) {
        dispatch(runDeleteFavoriteRepositorySaga({reponame}));
    }
});

export default connect(null, mapDispatchToProps)(StashRepository);