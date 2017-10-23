import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './sidebar.scss';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="sidebar">
                <div className="logo-container">
                    <NavLink to='/'>
                        <img src="/images/logo.png" />
                    </NavLink>
                </div>
                <ul className="nav-list">
                    {this.props.navigationLinks.map((link, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={link.to}
                                    exact className="nav-link"
                                    activeClassName="nav-link-active">
                                    {link.title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        );
    }
}