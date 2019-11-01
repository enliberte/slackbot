import {
    IClearSaveSettingsErrorAction,
    ISetSaveSuccessDisplayedAction,
    ISetSaveSettingsErrorAction
} from "./ISettingsActions";
import settingsActions from "./settingsActions"

export const setSaveSettingsError = (errorText: string): ISetSaveSettingsErrorAction =>
    ({type: settingsActions.SET_SAVE_SETTINGS_ERROR, payload: errorText});

export const clearSaveSettingsError = (): IClearSaveSettingsErrorAction =>
    ({type: settingsActions.CLEAR_SAVE_SETTINGS_ERROR});

export const setSaveSuccessDisplayed = (isDisplayed: boolean): ISetSaveSuccessDisplayedAction =>
    ({type: settingsActions.SET_SAVE_SUCCESS_DISPLAYED, payload: isDisplayed});