import * as React from 'react';

import { AccountInfo } from './AccountInfo';
import { ChangePassword } from './ChangePassword';

import Urls from '../../../shared/urls';
import { AuthorizationData } from '../../../shared/authorizationData';

import './accountPanel.scss';

export class AccountPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="account-panel">
                <AccountInfo
                    user={this.props.user}
                    onInfoChange={data => this.onInfoChange(data)}
                />
                <ChangePassword
                    onPasswordChange={(data, onSuccess, onError) => this.onPasswordChange(data, onSuccess, onError)}
                />
            </div>
        );
    }

    onInfoChange(data) {
        this.props.put(Urls.account.info, data, () => {
            let user = AuthorizationData.get();
            user.lastName = data.lastName;
            user.firstName = data.firstName;
            user.patronymic = data.patronymic;
            user.email = data.email;

            AuthorizationData.save(user);
            location.reload();
        });
    }

    onPasswordChange(data, onSuccess, onError) {
        this.props.post(Urls.account.password, data, result => {
            if (result.success === true) {
                onSuccess();
            } else {
                onError();
            }
        });
    }
}