import fetchingActions from "./fetchingActions"
import {ISetIsFetchingAction} from "./IFetchingActions";

export const setIsFetching = (isFetching: boolean): ISetIsFetchingAction => ({type: fetchingActions.SET_IS_FETCHING, payload: isFetching});