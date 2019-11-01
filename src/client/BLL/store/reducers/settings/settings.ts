import settingsActions from "../../action_creators/settings/settingsActions";
import ISettingsState from "./ISettingsState";


const initialState: ISettingsState = {
    stashDisplayNameError: false,
    stashDisplayNameErrorText: '',
    saveSuccessDisplayed: false
};


export default (state: ISettingsState = initialState, action: any) => {
    switch (action.type) {
        case settingsActions.SET_SAVE_SETTINGS_ERROR:
            return {
                ...state,
                stashDisplayNameError: true,
                stashDisplayNameErrorText: action.payload
            };
        case settingsActions.CLEAR_SAVE_SETTINGS_ERROR:
            return {
                ...state,
                stashDisplayNameError: false,
                stashDisplayNameErrorText: ''
            };
        case settingsActions.SET_SAVE_SUCCESS_DISPLAYED:
            return {
                ...state,
                saveSuccessDisplayed: action.payload
            };
        default:
            return state;
    }
}