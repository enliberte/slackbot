import React, {ReactNode} from 'react';
import Typography from '@material-ui/core/Typography';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import useStyles from "./styles";


interface IAdminListItemProps {
    handleClick?: () => void;
    children?: ReactNode;
    text: string;
}

const AdminListItem = ({children, handleClick, text}: IAdminListItemProps) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={handleClick}>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {text}
                        </Typography>
                    </React.Fragment>
                }
            />
            {children}
        </ListItem>
    )
};

export default AdminListItem;