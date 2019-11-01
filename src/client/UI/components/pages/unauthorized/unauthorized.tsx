import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import copy from 'clipboard-copy';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./styles";
import {Snackbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const Unauthorized = () => {
    const classes = useStyles();
    const [isCopySnackbarDisplayed, setIsCopySnackbarDisplayed] = React.useState(false);

    const handleCopy = () => {
        copy('signup');
        setIsCopySnackbarDisplayed(true);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography className={classes.tip}>
                    Send to slackbot a message with text <a className={classes.signup} onClick={handleCopy}>signup</a>
                </Typography>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={isCopySnackbarDisplayed}
                autoHideDuration={3000}
                onClose={() => setIsCopySnackbarDisplayed(false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Copied to clipboard</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => setIsCopySnackbarDisplayed(false)}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Container>
    );
};

export default Unauthorized;