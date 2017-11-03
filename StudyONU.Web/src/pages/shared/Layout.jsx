import * as React from 'react';
import { Header } from './Header';

import './layout.scss';

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                    <div className="layout">
                        {this.props.children}
                    </div>
            </div>
        );
    }
}
