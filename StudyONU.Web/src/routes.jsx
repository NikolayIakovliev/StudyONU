import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthorizationStorage } from './shared/authorizationStorage';

import { ApiWrapper } from './pages/shared/ApiWrapper';
import { NotFound } from './pages/shared/NotFound';

import { Registration } from './pages/register/Registration';
import { PublicCourses } from './pages/courses/public/PublicCourses';
import { MyCourses } from './pages/courses/my/MyCourses';
import { Course } from './pages/course/Course';


export class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                isLoggedIn: false,
                role: '',
                token: '',
                firstName: '',
                lastName: '',
                patronymic: '',
                photoPath: ''
            }
        }
    }

    componentDidMount() {
        AuthorizationStorage.subscribe(this);
    }

    render() {
        const user = this.state.user;

        let Api = ApiWrapper(user, (data) => AuthorizationStorage.save(data), () => AuthorizationStorage.clear());

        return (
            <Switch>
                <Route exact path='/' render={() => <Redirect to="/courses/public" />} />
                <Route path='/register' component={Api(Registration)} />
                <Route path='/courses/public' component={Api(PublicCourses)} />
                {user.isLoggedIn && <Route path='/courses/my' component={Api(MyCourses)} />}
                <Route path='/courses/:id(\d+)' component={Api(Course)} />
                <Route path='/404' component={NotFound} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }

    update() {
        let user = {
            isLoggedIn: AuthorizationStorage.any(),
            role: '',
            token: '',
            firstName: '',
            lastName: '',
            patronymic: '',
            photoPath: ''
        };
        
        if (user.isLoggedIn) {
            let authorizationData = AuthorizationStorage.get();
            user.isLoggedIn = true;
            user.role = authorizationData.role;
            user.token = authorizationData.token;
            user.firstName = authorizationData.firstName;
            user.lastName = authorizationData.lastName;
            user.patronymic = authorizationData.patronymic;
            user.photoPath = authorizationData.photoPath;
        }
        
        this.setState({
            user: user
        });
    }
}