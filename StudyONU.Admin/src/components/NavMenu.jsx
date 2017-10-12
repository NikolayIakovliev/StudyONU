import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component {
    render() {
        return (
            <div>
                <NavLink to={'/'}>home</NavLink><br />
                <NavLink to={'/counter'}>counter</NavLink><br />
                <NavLink to={'/uncounter'}>uncounter</NavLink><br />
            </div>
        );
    }
}
