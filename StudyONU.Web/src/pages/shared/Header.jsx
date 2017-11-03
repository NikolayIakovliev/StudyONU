import * as React from 'react';

import './header.scss';

export class Header extends React.Component {
    render() {
        return <div className="header" onClick={this.props.onLogin}>Войти</div>;
    }
}