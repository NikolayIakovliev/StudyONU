import * as React from 'react';
import { Api } from '../api';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <label>Email: </label>
                <input type="email" value={this.state.email} onChange={e => this.handleEmail(e.target.value)} />
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={e => this.handlePassword(e.target.value)} />
                <button onClick={e => this.send()}>Send</button>
                {this.state.error &&
                    <span>{this.state.error}</span>
                }
            </div>
        );
    }

    handleEmail(value) {
        this.setState({
            email: value
        });
    }

    handlePassword(value) {
        this.setState({
            password: value
        });
    }

    send() {
        let onLoginSuccess = this.props.onLoginSuccess;
        let response = Api.token(this.state, response => {
            let error = '';

            if (response.success) {
                onLoginSuccess(response.data);
            } else {
                error = 'Неверно введена почта или пароль';
            }

            this.setState({
                error: error
            });
        });
    }
}