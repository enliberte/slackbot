import IState from "../IState";

export const selectIsStashDisplayNameError = (state: IState) => state.settings.stashDisplayNameError;

export const selectStashDisplayNameErrorText = (state: IState) => state.settings.stashDisplayNameErrorText;

export const selectIsSaveSuccessDisplayed = (state: IState) => state.settings.saveSuccessDisplayed;

