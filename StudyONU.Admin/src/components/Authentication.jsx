import * as React from 'react';
import { Login } from './Login';
import { isUserLoggedIn, saveAuthorizationData, clearAuthorizationData, getAuthorizationData } from '../shared/shared';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                userRole: '',
                token: ''
            }
        }

        componentDidMount() {
            this.update();
        }

        render() {
            let _this = this;

            let renderedComponent = this.state.userRole
                ? <WrappedComponent onLogout={() => {
                    clearAuthorizationData();
                    _this.update();
                }} />
                : <Login onLoginSuccess={data => {
                    saveAuthorizationData(data);
                    _this.update();
                }} />; 

            return renderedComponent;
        }

        update() {
            let state = {
                userRole: '',
                token: ''
            };

            let userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                let authorizationData = getAuthorizationData();
                state.userRole = authorizationData.userRole;
                state.token = authorizationData.token;
            } else {

            }

            this.setState(state);
        }
    }
}