import * as React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { urls } from '../../../shared/api';
import { AuthorizationData } from '../../../shared/authorizationData';

import './accountPanel.scss';

export class AccountPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            patronymic: '',
            email: '',
            errors: {
                firstName: '',
                lastName: '',
                patronymic: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        const {
            firstName,
            lastName,
            patronymic,
            email
        } = this.props.user;
        const errors = {
            firstName: '',
            lastName: '',
            patronymic: '',
            email: ''
        }

        this.setState({
            firstName,
            lastName,
            patronymic,
            email,
            errors
        })
    }

    render() {
        const {
            firstName,
            lastName,
            patronymic,
            email,
            errors
        } = this.state;

        return (
            <Paper zDepth={3} className="account-panel">
                <Subheader>Мой профиль</Subheader>
                <Divider />
                <div style={{ padding: 30, paddingTop: 0 }}>
                    <TextField
                        floatingLabelText="Фамилия"
                        value={lastName}
                        errorText={errors.lastName}
                        onChange={(e, value) => this.setState({ lastName: value })}
                    /><br />
                    <TextField
                        floatingLabelText="Имя"
                        value={firstName}
                        errorText={errors.firstName}
                        onChange={(e, value) => this.setState({ firstName: value })}
                    /><br />
                    <TextField
                        floatingLabelText="Отчество"
                        value={patronymic}
                        errorText={errors.patronymic}
                        onChange={(e, value) => this.setState({ patronymic: value })}
                    /><br />
                    <TextField
                        floatingLabelText="E-Mail"
                        value={email}
                        errorText={errors.email}
                        onChange={(e, value) => this.setState({ email: value })}
                    /><br />
                    <div className="btn-container">
                        <RaisedButton
                            label="Сохранить изменения"
                            primary={true}
                            onClick={() => this.sendForm()}
                        />
                    </div>
                </div>
            </Paper>
        );
    }

    sendForm() {
        const validated = this.validateForm();
        if (validated) {
            const data = {
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                patronymic: this.state.patronymic,
                email: this.state.email
            }

            this.props.put(urls.account.info, data, () => {
                let user = AuthorizationData.get();
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                user.patronymic = data.patronymic;
                user.email = data.email;

                AuthorizationData.save(user);
                location.reload();
            });
        }
    }

    validateForm() {
        const {
            lastName,
            firstName,
            patronymic,
            email
        } = this.state;

        let errors = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: ''
        }

        let valid = true;

        if (lastName.length < 1 || lastName.length > 20) {
            valid = false;
            errors.lastName = 'От 1 до 20 символов';
        }
        if (firstName.length < 1 || firstName.length > 20) {
            valid = false;
            errors.firstName = 'От 1 до 20 символов';
        }
        if (patronymic.length < 1 || patronymic.length > 20) {
            valid = false;
            errors.patronymic = 'От 1 до 20 символов';
        }
        if (email.length < 1 || email.length > 254) {
            valid = false;
            errors.email = 'От 1 до 254 символов';
        }

        this.setState({ errors: errors });

        return valid;
    }
}