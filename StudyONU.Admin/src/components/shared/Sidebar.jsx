import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { ToggleButton } from './ToggleButton';

import './sidebar.scss';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true
        }
    }

    render() {
        const {
            expanded
        } = this.state;

        const classes = this.getSidebarClasses(expanded);

        return (
            <aside className={classes.join(" ")}>
                <div className="sidebar-control">
                    <ToggleButton value={expanded} onToggle={() => this.onToggle(!expanded)} />
                </div>
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
                                    exact className={`nav-link${link.important ? ' important' : ''}`}
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

    getSidebarClasses(expanded) {
        let classes = ['sidebar'];

        if (!expanded) {
            classes.push('minified');
        }

        return classes;
    }

    onToggle(expanded) {
        this.props.onToggle(expanded);
        this.setState({
            expanded
        });
    }
}