import React, {ReactNode} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            margin: 'auto',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }),
);

interface ModalWindowProps {
    open: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const ModalWindow = ({open, children, handleClose}: ModalWindowProps) => {
    const classes = useStyles();

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default ModalWindow;