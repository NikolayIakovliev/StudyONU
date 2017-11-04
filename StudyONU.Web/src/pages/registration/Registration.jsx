import * as React from 'react';
import { Header } from '../shared/Header';

export class Registration extends React.Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                Register
            </div>
        );
    }
}