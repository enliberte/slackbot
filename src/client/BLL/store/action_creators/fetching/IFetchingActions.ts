import fetchingActions from './fetchingActions';


export interface ISetIsFetchingAction {
    type: typeof fetchingActions.SET_IS_FETCHING;
    payload: boolean;
}