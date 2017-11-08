import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PropsWrapper } from './pages/shared/PropsWrapper';

import { PublicCourses } from './pages/courses/public/PublicCourses';
import { MyCourses } from './pages/courses/my/MyCourses';
import { Registration } from './pages/register/Registration';

export class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => <Redirect to="/courses/public" />} />
                <Route exact path='/register' component={PropsWrapper(Registration, this.props)} />
                <Route exact path='/courses/public' component={PropsWrapper(PublicCourses, this.props)} />
                <Route exact path='/courses/my' component={PropsWrapper(MyCourses, this.props)} />
            </Switch>
        );
    }
}