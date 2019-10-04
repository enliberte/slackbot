import React from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {setSubscribeFilters} from "../../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {connect} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {IRepository} from "../../../../../../../backend/db/models/RepositoryModel";
import {IDeleteRepositoryFilters} from "../../../../../../BLL/store/action_creators/repositories/IRepositoriesFilters";
import {runDeleteFavoriteRepositorySaga} from "../../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";


interface IFavoriteRepositoryProps extends ReturnType<typeof mapDispatchToProps> {
    repository: IRepository;
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

const FavoriteRepository = ({repository, setRepository, deleteRepository}: IFavoriteRepositoryProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => setRepository(repository.reponame)}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {repository.reponame}
                        </Typography>
                    </React.Fragment>
                }
            />
            <IconButton
                size="small"
                className={classes.button} aria-label="delete"
                onClick={() => deleteRepository({reponame: repository.reponame})}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    setRepository(reponame: string) {
        dispatch(setSubscribeFilters({reponame}));
    },
    deleteRepository(filters: IDeleteRepositoryFilters) {
        dispatch(runDeleteFavoriteRepositorySaga(filters));
    }
});

export default connect(null, mapDispatchToProps)(FavoriteRepository);