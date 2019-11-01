import React from 'react';
import {setIsFavoriteRepositoriesOnly} from "../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import {connect} from "react-redux";
import {selectIsFavoriteDevelopersOnly} from "../../../../../BLL/store/selectors/developers";
import AdminTableTitle from "../../../common/table/tableTitle/AdminTableTitle";


type StashDevelopersTableTitleProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StashDevelopersTableTitle = ({isFavoriteOnly, setIsFavoriteOnly}: StashDevelopersTableTitleProps) => {
    return (
        <AdminTableTitle titleText="Developers" isFavoriteOnly={isFavoriteOnly} setIsFavoriteOnly={setIsFavoriteOnly} />
    );
};

const mapStateToProps = (state: any) => ({
    isFavoriteOnly: selectIsFavoriteDevelopersOnly(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setIsFavoriteOnly(isFavoriteOnly: boolean) {
        dispatch(setIsFavoriteRepositoriesOnly(isFavoriteOnly));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StashDevelopersTableTitle);