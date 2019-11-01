import settingsActions from './settingsActions';


export interface ISetSaveSettingsErrorAction {
    type: typeof settingsActions.SET_SAVE_SETTINGS_ERROR;
    payload: string
}

export interface IClearSaveSettingsErrorAction {
    type: typeof settingsActions.CLEAR_SAVE_SETTINGS_ERROR;
}

export interface ISetSaveSuccessDisplayedAction {
    type: typeof settingsActions.SET_SAVE_SUCCESS_DISPLAYED;
    payload: boolean;
}