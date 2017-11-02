import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { Sidebar } from './Sidebar';
//import { Header } from './Header';

export class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
