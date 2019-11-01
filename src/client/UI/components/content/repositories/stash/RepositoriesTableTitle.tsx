import React from 'react';
import {selectIsFavoriteRepositoriesOnly} from "../../../../../BLL/store/selectors/repositories";
import {setIsFavoriteRepositoriesOnly} from "../../../../../BLL/store/action_creators/repositories/repositoriesActionCreators";
import {connect} from "react-redux";
import AdminTableTitle from "../../../common/table/tableTitle/AdminTableTitle";


type StashRepositoriesTableTitleProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StashRepositoriesTableTitle = ({isFavoriteOnly, setIsFavoriteOnly}: StashRepositoriesTableTitleProps) => {
    return (
        <AdminTableTitle titleText="Repositories" isFavoriteOnly={isFavoriteOnly} setIsFavoriteOnly={setIsFavoriteOnly} />
    );
};

const mapStateToProps = (state: any) => ({
    isFavoriteOnly: selectIsFavoriteRepositoriesOnly(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setIsFavoriteOnly(isFavoriteOnly: boolean) {
        dispatch(setIsFavoriteRepositoriesOnly(isFavoriteOnly));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StashRepositoriesTableTitle);