import * as React from 'react';

import './layout.scss';

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">
                {this.props.children}
            </div>
        );
    }
}
