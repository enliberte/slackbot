import React from 'react';
import AdminTextFieldWithSelection from "../../../common/textfields/textfieldWithSelection/textfieldWithSelection";
import {connect} from 'react-redux';
import {
    selectIsRepositoryEditing,
    selectIsRepositoryValid,
    selectRepositoryErrorText
} from "../../../../../BLL/store/selectors/subscribes";
import {
    setIsSuccess, setSubscribeError,
    toggleEditingRepositoryWindow
} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";
import {selectStashRepositoriesSuggests} from "../../../../../BLL/store/selectors/repositories";
import AddRepositoryPanel from "../../repositories/addRepositoriesPanel/AddRepositoryPanel";


type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
interface IRepositoryTextfieldProps extends Props {
    value: string;
    onChange: (value: string) => void;
}


const RepositoryTextfield = ({value, onChange, isValid, errorText, repositoriesSuggests, toggleAddRepositoryPanel, isRepositoryPanelDisplayed, clearErrors}: IRepositoryTextfieldProps) => {
    const label = isValid ? 'Repository Name' : errorText;

    React.useEffect(() => {
        clearErrors();
    }, []);

    return (
        <AdminTextFieldWithSelection
            dialogTitle="Click on repository to choose"
            value={value || ''}
            focused={false}
            onChange={onChange}
            isValid={isValid}
            label={label}
            data={repositoriesSuggests}
            toggleAddPanel={toggleAddRepositoryPanel}
            isAddPanelOpened={isRepositoryPanelDisplayed}>
            <AddRepositoryPanel handleClick={onChange} />
        </AdminTextFieldWithSelection>
    );
};

const mapStateToProps = (state: any) => ({
    isRepositoryPanelDisplayed: selectIsRepositoryEditing(state),
    repositoriesSuggests: selectStashRepositoriesSuggests(state),
    isValid: selectIsRepositoryValid(state),
    errorText: selectRepositoryErrorText(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleAddRepositoryPanel() {
        dispatch(toggleEditingRepositoryWindow());
    },
    clearErrors() {
        dispatch(setIsSuccess(true));
        dispatch(setSubscribeError({developer: '', repository: '', subscribe: ''}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryTextfield);
