import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;

        return (
            <div className="header">
                <div className="user-info">
                    <p className="fullname">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="role">{user.role}</p>
                </div>
                <img src={user.photoPath} className="user-avatar" />
                <button className="logout-btn" onClick={e => this.props.logout()}>Выйти</button>
            </div>
        );
    }
}
