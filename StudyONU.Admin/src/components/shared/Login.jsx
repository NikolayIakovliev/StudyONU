import * as React from 'react';
import { Api } from '../../shared/api';

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
        let response = Api.token(this.state, response => {
            if (response.success) {
                this.props.onLoginSuccess(response.data);
            } else {
                this.setState({
                    error: 'Неверно введена почта или пароль'
                });
            }
        });
    }
}