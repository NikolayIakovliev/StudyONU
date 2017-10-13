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
                <NavLink to={'/'}>home</NavLink><br />
                <NavLink to={'/counter'}>counter</NavLink><br />
                <NavLink to={'/uncounter'}>uncounter</NavLink><br />
                <button onClick={e => _this.props.onLogout()}>Logout</button>
            </div>
        );
    }
}