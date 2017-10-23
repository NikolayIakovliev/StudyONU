import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className="user-info">
                    <p className="fullname">Админ Админович</p>
                    <p className="role">Администратор</p>
                </div>
                <img src="/images/admin.png" className="user-avatar" />
                <button className="logout-btn" onClick={e => this.props.logout()}>Выйти</button>
            </div>
        );
    }
}