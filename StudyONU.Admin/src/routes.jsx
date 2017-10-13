import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { Uncounter } from './components/Uncounter';

export class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout {...this.props}>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/uncounter' component={Uncounter} />
            </Layout>
        );
    }
}