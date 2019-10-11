import React, {ReactNode} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle} from "@material-ui/core";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


interface DialogWindowProps {
    open: boolean;
    dialogTitle: string;
    handleClose: () => void;
    children: ReactNode;
    actions: {text: string, onClick: () => void}[]
}

const DialogWindow = ({open, dialogTitle, children, handleClose, actions}: DialogWindowProps) => {
    return (
        <div>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions.map(action => <Button onClick={action.onClick} color="primary">{action.text}</Button>)}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogWindow;