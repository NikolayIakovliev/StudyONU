import * as React from 'react';
import { Link } from 'react-router-dom';

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
                    <p className="fullname">{`${user.lastName} ${user.firstName} ${user.patronymic}`}</p>
                    <p className="role">{user.displayRole}</p>
                </div>
                <img src={user.photoPath} className="user-avatar" />
                <Link className="account-panel-link" to="/account/info">Личный кабинет</Link>
                <button className="logout-btn" onClick={() => this.props.onLogout()}>Выйти</button>
            </div>
        );
    }
}
