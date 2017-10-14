import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let _this = this;
        return (
            <div>
                {this.props.allowedLinks.map((link, index) => {
                    return <div key={index}><NavLink to={link.to}>{link.title}</NavLink></div>
                })}
                <button onClick={e => _this.props.onLogout()}>Logout</button>
            </div>
        );
    }
}