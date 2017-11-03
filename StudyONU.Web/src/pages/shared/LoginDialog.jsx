import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class LoginDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        const {
            email,
            password
        } = this.state;

        const actions = [
            <FlatButton
                label="Подтвердить"
                primary={true}
                onClick={() => this.props.onSubmit(this.state)}
            />,
            <FlatButton
                label="Отмена"
                primary={true}
                onClick={this.props.onClose}
            />,
        ];

        return <Dialog
            title="Вход в систему"
            actions={actions}
            contentStyle={{ width: 305 }}
            open={this.props.open}
            onRequestClose={this.props.onClose}>
            <TextField
                floatingLabelText="E-Mail"
                value={email}
                onChange={value => this.setState({ email: value })}
            /><br />
            <TextField
                floatingLabelText="Пароль"
                type="password"
                value={password}
                onChange={value => this.setState({ password: value })}
            /><br />
            {this.props.error && <span style={{ fontSize: 14, color: 'red', fontStyle: 'italic'}}>Неверно введёна почта или пароль</span>}
        </Dialog>;
    }
}