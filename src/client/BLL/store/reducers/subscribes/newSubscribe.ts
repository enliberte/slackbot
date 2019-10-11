import subscribesActions from "../../action_creators/subscribes/subscribesActions";


export interface ISubscribeData {
    id: string;
    followed: string;
    reponame: string;
}

export interface ISubscribeState {
    data: ISubscribeData;
    isNew: true;
    isRepositoryPanelDisplayed: boolean;
    isDeveloperPanelDisplayed: boolean;
    success: boolean;
}

const initialState: ISubscribeState = {
    data: {
        id: '',
        followed: '',
        reponame: ''
    },
    isNew: true,
    isDeveloperPanelDisplayed: false,
    isRepositoryPanelDisplayed: false,
    success: true
};


export default (state: ISubscribeState = initialState, action: any) => {
    switch (action.type) {
        case subscribesActions.SET_SUBSCRIBE:
            return {
                ...state,
                data: {...state.data, ...action.payload}
            };
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
        case subscribesActions.SET_IS_NEW:
            return {
                ...state,
                isNew: action.payload
            };
        default:
            return state;
    }
}