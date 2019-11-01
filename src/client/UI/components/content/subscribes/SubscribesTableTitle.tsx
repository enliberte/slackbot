import React from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ToggleMassAdminIconButton
    from "../../common/buttons/iconButtons/toggleMassAdminIconButton/toggleMassAdminIconButton";
import {connect} from "react-redux";
import DeleteAdminIconButton from "../../common/buttons/iconButtons/deleteAdminIconButton/deleteAdminIconButton";


interface ISubscribesTableTitleProps {
    massOperationOpened: boolean;
    setMassOperationOpened: (massOperationOpened: boolean) => void;
    clearSelectedSubscribes: () => void;
    deleteSelectedSubscribes: () => void;
}

const SubscribesTableTitle = ({massOperationOpened, setMassOperationOpened, deleteSelectedSubscribes, clearSelectedSubscribes}: ISubscribesTableTitleProps) => {

    const toggleMassOperation = () => {
        clearSelectedSubscribes();
        setMassOperationOpened(!massOperationOpened);
    };

    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography variant="h6" style={{lineHeight: 2}}>Subscribes</Typography>
            </Grid>
            {/*<Grid item>*/}
            {/*    <ToggleMassAdminIconButton isOpened={massOperationOpened} handleClick={toggleMassOperation} />*/}
            {/*</Grid>*/}
            {/*{massOperationOpened &&*/}
            {/*    <Grid item>*/}
            {/*        <DeleteAdminIconButton handleClick={deleteSelectedSubscribes}/>*/}
            {/*    </Grid>*/}
            {/*}*/}
        </Grid>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    clearSelectedSubscribes() {

    },
    deleteSelectedSubscribes() {

    }
});

export default connect(mapDispatchToProps)(SubscribesTableTitle);