import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

import './layout.scss';

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sidebar navigationLinks={this.props.navigationLinks} />
                <div className="layout">
                    <Header logout={this.props.onLogout} user={this.props.user} />
                    <MuiThemeProvider>
                        <div className="layout-content">
                            {this.props.children}
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
