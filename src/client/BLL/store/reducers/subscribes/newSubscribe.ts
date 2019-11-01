import subscribesActions from "../../action_creators/subscribes/subscribesActions";


export interface ISubscribeData {
    id: string;
    followed: string;
    reponame: string;
    followedEmail: string;
    repoUrl: string;
}

export interface ISubscribeError {
    developer: string;
    repository: string;
    subscribe: string;
}

export interface ISubscribeState {
    isRepositoryPanelDisplayed: boolean;
    isDeveloperPanelDisplayed: boolean;
    success: boolean;
    error: ISubscribeError;
}

const initialState: ISubscribeState = {
    isDeveloperPanelDisplayed: false,
    isRepositoryPanelDisplayed: false,
    success: true,
    error: {
        developer: '',
        repository: '',
        subscribe: ''
    }
};


export default (state: ISubscribeState = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.TOGGLE_EDITING_REPOSITORY_WINDOW:
            return {
                ...state,
                isRepositoryPanelDisplayed: !state.isRepositoryPanelDisplayed
            };
        case subscribesActions.TOGGLE_EDITING_DEVELOPER_WINDOW:
            return {
                ...state,
                isDeveloperPanelDisplayed: !state.isDeveloperPanelDisplayed
            };
        case subscribesActions.SET_IS_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        case subscribesActions.SET_SUBSCRIBE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}