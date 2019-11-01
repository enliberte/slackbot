import React from 'react';
import AdminTextFieldWithSelection from "../../../common/textfields/textfieldWithSelection/textfieldWithSelection";
import AddDeveloperPanel from "../../developers/addDevelopersPanel/AddDeveloperPanel";
import {connect} from 'react-redux';
import {
    selectDeveloperErrorText,
    selectIsDeveloperEditing,
    selectIsDeveloperValid
} from "../../../../../BLL/store/selectors/subscribes";
import {selectStashDevelopersSuggests} from "../../../../../BLL/store/selectors/developers";
import {
    setIsSuccess, setSubscribeError,
    toggleEditingDeveloperWindow
} from "../../../../../BLL/store/action_creators/subscribes/subscribesActionCreators";


type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
interface IDeveloperTextfieldProps extends Props {
    value: string;
    onChange: (value: string) => void;
}


const DeveloperTextfield = ({value, onChange, isValid, errorText, developersSuggests, toggleAddDeveloperPanel, isDeveloperPanelDisplayed, clearErrors}: IDeveloperTextfieldProps) => {
    const label = isValid ? 'Developer Name' : errorText;

    React.useEffect(() => {
        clearErrors();
    }, []);

    return (
        <AdminTextFieldWithSelection
            dialogTitle="Click on developer to choose"
            value={value || ''}
            focused={true}
            onChange={onChange}
            isValid={isValid}
            label={label}
            data={developersSuggests}
            toggleAddPanel={toggleAddDeveloperPanel}
            isAddPanelOpened={isDeveloperPanelDisplayed}>
            <AddDeveloperPanel handleClick={onChange} />
        </AdminTextFieldWithSelection>
    );
};

const mapStateToProps = (state: any) => ({
    isDeveloperPanelDisplayed: selectIsDeveloperEditing(state),
    developersSuggests: selectStashDevelopersSuggests(state),
    isValid: selectIsDeveloperValid(state),
    errorText: selectDeveloperErrorText(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleAddDeveloperPanel() {
        dispatch(toggleEditingDeveloperWindow());
    },
    clearErrors() {
        dispatch(setIsSuccess(true));
        dispatch(setSubscribeError({developer: '', repository: '', subscribe: ''}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperTextfield);
