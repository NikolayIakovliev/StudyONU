import * as React from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirm: '',
            errors: {
                oldPassword: '',
                newPassword: '',
                confirm: ''
            }
        }
    }

    render() {
        const {
            oldPassword,
            newPassword,
            confirm,
            errors
        } = this.state;

        return (
            <Paper zDepth={3}>
                <Subheader>Изменение пароля</Subheader>
                <Divider />
                <div style={{ padding: 30 }}>
                    <TextField style={{ marginTop: -30 }}
                        floatingLabelText="Текущий пароль"
                        errorText={errors.oldPassword}
                        onChange={(e, value) => this.setState({ oldPassword: value })}
                        value={oldPassword}
                        type="password"
                    /><br />
                    <TextField
                        floatingLabelText="Новый пароль"
                        errorText={errors.newPassword}
                        onChange={(e, value) => this.setState({ newPassword: value })}
                        value={newPassword}
                        type="password"
                    /><br />
                    <TextField
                        floatingLabelText="Ещё раз"
                        errorText={errors.confirm}
                        onChange={(e, value) => this.setState({ confirm: value })}
                        value={confirm}
                        type="password"
                    /><br /><br /><br />
                    <RaisedButton label="Подтвердить" primary={true} onClick={e => this.sendForm()} />
                </div>
            </Paper>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const data = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                confirm: this.state.confirm
            }

            let self = this;
            this.props.onPasswordChange(data, () => self.resetForm(), () => {
                let errors = {
                    oldPassword: 'Старый пароль введён неправильно',
                    newPassword: '',
                    confirm: ''
                }

                this.setState({ errors });
            });
        }
    }

    validateForm() {
        const {
            oldPassword,
            newPassword,
            confirm
        } = this.state;

        let errors = {
            oldPassword: '',
            newPassword: '',
            confirm: ''
        }

        let valid = true;

        if (oldPassword.length == 0) {
            valid = false;
            errors.oldPassword = 'Введите старый пароль';
        }
        if (newPassword.length == 0) {
            valid = false;
            errors.newPassword = 'Введите новый пароль';
        }
        if (newPassword != confirm) {
            valid = false;
            errors.confirm = 'Пароли не совпадают';
        }

        this.setState({ errors: errors });
        return valid;
    }

    resetForm() {
        this.setState({
            oldPassword: '',
            newPassword: '',
            confirm: '',
            errors: {
                oldPassword: '',
                newPassword: '',
                confirm: ''
            }
        });
    }
}
