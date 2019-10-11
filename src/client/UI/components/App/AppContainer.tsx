import React from 'react';
import {connect} from "react-redux";
import {runGetAuthSaga} from "../../../BLL/store/action_creators/auth/authActionCreators";
import App from "./App";

type AppProps = ReturnType<typeof mapDispatchToProps>;


const AppContainer = ({getAuthData}: AppProps) => {
    React.useEffect(() => {
        getAuthData();
    });

    return (
        <App />
    )
};

const mapDispatchToProps = (dispatch: any) => ({
    getAuthData() {
        dispatch(runGetAuthSaga())
    }
});

export default connect(null, mapDispatchToProps)(AppContainer);