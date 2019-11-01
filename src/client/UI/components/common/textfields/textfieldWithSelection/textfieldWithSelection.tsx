import React from 'react';

import TocAdminIconButton from "../../buttons/iconButtons/tocAdminIconButton/tocAdminIconButton";
import AdminTextField, {IAdminAutosuggestProps} from "../textfield/textfield";
import DialogWindow from "../../dialog/dialog";
import {Grid} from "@material-ui/core";


export interface IAdminTextFieldWithSelectionProps extends IAdminAutosuggestProps {
    dialogTitle: string;
    toggleAddPanel: () => void;
    isAddPanelOpened: boolean;
    children: React.ReactNode;
    data: string[];
}

const AdminTextFieldWithSelection = ({value, onChange, isValid, label, focused, dialogTitle, toggleAddPanel, isAddPanelOpened, children, data}: IAdminTextFieldWithSelectionProps) => {
    return (
        <>
            <Grid container xs={12} spacing={2}>
                <Grid item xs={11}>
                    <AdminTextField value={value} onChange={onChange} focused={focused} isValid={isValid} label={label} data={data}/>
                </Grid>
                <Grid item xs={1}>
                    <TocAdminIconButton handleClick={toggleAddPanel}/>
                </Grid>
            </Grid>
                <DialogWindow
                    dialogTitle={dialogTitle}
                    open={isAddPanelOpened}
                    handleClose={toggleAddPanel}
                    actions={[{text: 'Cancel', onClick: toggleAddPanel}]}>
                    {children}
                </DialogWindow>
        </>
    );
};

export default AdminTextFieldWithSelection;