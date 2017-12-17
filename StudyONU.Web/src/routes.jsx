import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthorizationStorage } from './shared/authorizationStorage';

import { ApiWrapper } from './pages/shared/ApiWrapper';
import { NotFound } from './pages/shared/NotFound';

import { Registration } from './pages/register/Registration';
import { PublicCourses } from './pages/courses/public/PublicCourses';
import { MyCourses } from './pages/courses/my/MyCourses';
import { Course } from './pages/course/Course';
import { Task } from './pages/task/Task';
import { GuideList } from './pages/guides/GuideList';
import { CourseProgress } from './pages/courseProgress/CourseProgress';

import { Api, urls } from './shared/api';

export class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.getUser()
        }
    }

    componentDidMount() {
        AuthorizationStorage.subscribe(this);
        Api.post(urls.check, null)
            .then(response => {
                if (response.status == 401) {
                    AuthorizationStorage.clear();
                }
            });
    }

    render() {
        const user = this.state.user;

        let Api = ApiWrapper(user, (data) => AuthorizationStorage.save(data), () => AuthorizationStorage.clear());
        
        return (
            <Switch>
                <Route exact path='/' render={() => <Redirect to="/courses/public" />} />
                <Route exact path='/register' component={Api(Registration)} />
                <Route exact path='/courses/public' component={Api(PublicCourses)} />
                <Route exact path='/courses/my' component={Api(MyCourses)} />
                <Route exact path='/courses/:id(\d+)/tasks' component={Api(Course)} />
                <Route exact path='/courses/:id(\d+)/guides' component={Api(GuideList)} />
                <Route exact path='/courses/:id(\d+)/progress' component={Api(CourseProgress)} />
                <Route exact path='/courses/:courseId(\d+)/tasks/:id(\d+)' component={Api(Task)} />
                <Route path='/404' component={NotFound} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }

    update() {
        let user = this.getUser();
        
        this.setState({
            user: user
        });
    }

    getUser() {
        let user = {
            isLoggedIn: AuthorizationStorage.any(),
            role: '',
            displayRole: '',
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
            user.displayRole = authorizationData.displayRole;
            user.token = authorizationData.token;
            user.firstName = authorizationData.firstName;
            user.lastName = authorizationData.lastName;
            user.patronymic = authorizationData.patronymic;
            user.photoPath = authorizationData.photoPath;
        }

        return user;
    }
}