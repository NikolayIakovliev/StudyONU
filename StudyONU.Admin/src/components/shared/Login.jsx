import * as React from 'react';
import { Api } from '../../shared/api';

import './login.scss';

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
            <div className="login-page">
                <div className="line-centered">
                    <div>
                        <div className="title">
                            <p>Информационный портал Одесского</p>
                            <p>национального университета</p>
                            <p>имени И. И. Мечникова</p>
                        </div>
                        <img src="/images/logo.png" className="logo" />
                    </div>
                    <div className="form-box">
                        <p className="form-title">Авторизация</p>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Ваша почта :</label>
                                <input id="email" type="email" name="email" className="form-input" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Ваш пароль :</label>
                                <input id="password" type="password" name="password" className="form-input" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-btn" onClick={e => { e.preventDefault(); this.sendForm(); }}>Войти</button>
                        </form>
                        <div className="extra-info">
                            <a className="forgot-password" href="#">Забыли пароль?</a>
                            {this.state.error &&
                                <div className="login-error">{this.state.error}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    sendForm() {
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