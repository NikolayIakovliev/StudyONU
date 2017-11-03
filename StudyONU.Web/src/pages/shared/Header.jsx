import * as React from 'react';
import { Redirect } from 'react-router';

import './header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            register: false
        }
    }

    render() {
        if (this.state.register) {
            return <Redirect to="/register" />;
        }

        return <div className="header">
            <p onClick={this.props.onLogin}>Войти</p>
            <p onClick={() => this.setState({ register: true })}>Зарегистрироваться</p>
        </div>;
    }
}