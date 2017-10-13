import * as React from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <NavMenu {...this.props} />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
