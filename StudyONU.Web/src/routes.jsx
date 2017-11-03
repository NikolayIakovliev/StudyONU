﻿import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PropsWrapper } from './pages/shared/PropsWrapper';

import { Layout } from './pages/shared/Layout';
import { Home } from './pages/home/Home';

export class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout {...this.props}>
                <Switch>
                    <Route exact path='/' component={PropsWrapper(Home, this.props)} />
                </Switch>
            </Layout>
        );
    }
}