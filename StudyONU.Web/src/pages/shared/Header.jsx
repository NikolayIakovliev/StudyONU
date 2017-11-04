import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import './header.scss';

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    render() {
        const {
            open
        } = this.state;
        const {
            history,
            navigationLinks,
            backLink,
            user
        } = this.props

        const leftControl = this.getLeftControl(backLink);
        const rightAccount = this.getRightAccount(user);

        return (
            <div className="header-wrapper">
                <div className="header">
                    <div className="header-content">
                        <div className="left-controls">
                            {leftControl}
                        </div>
                        {navigationLinks &&
                            <div className="navbar-links">
                                {navigationLinks.map((navigationLink, index) => {
                                    return (
                                        <NavLink
                                            key={index}
                                            to={navigationLink.to}
                                            exact className="navbar-link"
                                            activeClassName="navbar-link-active">
                                            {navigationLink.title}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        }
                        <div className="right-account">
                            {rightAccount}
                        </div>
                    </div>
                </div>
                {!backLink &&
                    <Drawer
                        open={open}
                        docked={false}
                        onRequestChange={open => this.setState({ open: open })}>
                        <MenuItem onClick={() => history.push('/')}>
                            Home
                        </MenuItem>
                        <MenuItem onClick={() => history.push('/register')}>
                            Register
                        </MenuItem>
                    </Drawer>
                }
            </div>
        );
    }

    getLeftControl(backLink) {
        return backLink
            ? (
                <Link to={backLink}>
                    <NavigationArrowBack color="white" hoverColor="#5FAC9F" />
                </Link>
            ) : <NavigationMenu cursor="pointer" color="white" onClick={() => this.setState({ open: true })} />;
    }

    getRightAccount(user) {
        return user.isLoggedIn
            ? (
                <div>
                    <div className="user-info">
                        <p className="fullname">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="role">{user.role}</p>
                    </div>
                    <img src={user.photoPath} className="user-avatar" />
                    <button className="logout-btn" onClick={e => this.props.logout()}>Выйти</button>
                </div>
            )
            : (
                <div className="auth-links">
                    <button className="btn" onClick={() => this.props.onLogin()}>Войти</button>
                    <button className="btn" onClick={() => this.props.history.push('/register')}>Регистрация</button>
                </div>
                );
    }
}