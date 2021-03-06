﻿import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

import './layout.scss';

export class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            layoutExpanded: false
        }
    }

    render() {
        const classes = this.getLayoutClasses();

        return (
            <div>
                <Sidebar navigationLinks={this.props.navigationLinks} onToggle={expanded => this.setState({ layoutExpanded: !expanded })} />
                <div className={classes.join(" ")}>
                    <Header onLogout={this.props.onLogout} user={this.props.user} />
                    <div className="layout-content">
                        <MuiThemeProvider>
                            {this.props.children}
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }

    getLayoutClasses() {
        const { layoutExpanded } = this.state;

        let classes = ['layout'];

        if (layoutExpanded) {
            classes.push('expanded');
        }

        return classes;
    }
}
