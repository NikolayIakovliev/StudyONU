import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/shared/Layout';
import { NotFound } from './components/shared/NotFound';
import { AccountPanel } from './components/shared/account/AccountPanel';

import { AdminHome } from './components/admin/home/Home';
import { LecturerList } from './components/admin/lecturers/LecturerList';
import { SpecialityList } from './components/admin/specialities/SpecialityList';

import { LecturerHome } from './components/lecturer/home/Home';
import { CourseList } from './components/lecturer/courses/CourseList';
import { GuideList } from './components/lecturer/guides/GuideList';
import { TaskList } from './components/lecturer/tasks/TaskList';
import { StudentQueueList } from './components/lecturer/studentQueue/StudentQueueList';
import { SentReportBox } from './components/lecturer/reports/SentReportBox';
import { OnCheckReportBox } from './components/lecturer/reports/OnCheckReportBox';
import { CourseProgress } from './components/lecturer/courseProgress/CourseProgress';

import Login from './components/shared/Login';
import ApiWrapper from './components/shared/ApiWrapper';

import Api from './shared/api';
import Urls from './shared/urls';
import AuthorizationStorage from './shared/authorizationStorage';

const adminRole = 'Админ';
const lecturerRole = 'Преподаватель';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getUser();

        AuthorizationStorage.subscribe(this);
    }

    componentDidMount() {
        if (AuthorizationStorage.any()) {
            Api.post(Urls.check, null, null, () => AuthorizationStorage.clear());
        }
    }

    render() {
        if (!AuthorizationStorage.any()) {
            return <Login
                onLoginSuccess={data => {
                    AuthorizationStorage.save(data);
                    this.props.history.push('/');
                }} />
        }

        let PropsApiWrapper = ApiWrapper(this.state, this.props);

        let userRole = this.state.role;
        let routes;
        let links;

        if (userRole == adminRole) {
            links = [
                {
                    title: 'Домашняя страница',
                    to: '/'
                },
                {
                    title: 'Преподаватели',
                    to: '/lecturers'
                },
                {
                    title: 'Специальности',
                    to: '/specialities'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={PropsApiWrapper(AdminHome, this.props)} />
                    <Route path='/lecturers' component={PropsApiWrapper(LecturerList, this.props)} />
                    <Route path='/specialities' component={PropsApiWrapper(SpecialityList, this.props)} />
                    <Route path='/account/info' component={PropsApiWrapper(AccountPanel, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        } else if (userRole == lecturerRole) {
            links = [
                {
                    title: 'Домашняя страница',
                    to: '/'
                },
                {
                    title: 'Курсы',
                    to: '/courses'
                },
                {
                    title: 'Методички',
                    to: '/guides'
                },
                {
                    title: 'Задачи',
                    to: '/tasks'
                },
                {
                    title: 'Заявки студентов',
                    to: '/students/queue'
                },
                {
                    title: 'Отправленные отчёты',
                    to: '/reports/sent'
                },
                {
                    title: 'Отчёты на проверке',
                    to: '/reports/oncheck'
                },
                {
                    title: 'Успеваемость',
                    to: '/course/progress'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={PropsApiWrapper(LecturerHome, this.props)} />
                    <Route path='/courses' component={PropsApiWrapper(CourseList, this.props)} />
                    <Route path='/guides' component={PropsApiWrapper(GuideList, this.props)} />
                    <Route path='/tasks' component={PropsApiWrapper(TaskList, this.props)} />
                    <Route path='/students/queue' component={PropsApiWrapper(StudentQueueList, this.props)} />
                    <Route path='/reports/sent' component={PropsApiWrapper(SentReportBox, this.props)} />
                    <Route path='/reports/oncheck' component={PropsApiWrapper(OnCheckReportBox, this.props)} />
                    <Route path='/course/progress' component={PropsApiWrapper(CourseProgress, this.props)} />
                    <Route path='/account/info' component={PropsApiWrapper(AccountPanel, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        }

        return (
            <Layout navigationLinks={links} {...this.props} user={this.state}>
                {routes}
            </Layout>
        );
    }
    
    update() {
        const user = this.getUser();
        this.setState(user);
    }

    getUser() {
        let user = {
            email: '',
            role: '',
            token: '',
            firstName: '',
            lastName: '',
            patronymic: '',
            photoPath: ''
        }

        let userLoggedIn = AuthorizationStorage.any();
        if (userLoggedIn) {
            let storage = AuthorizationStorage.get();
            user.email = storage.email;
            user.role = storage.role;
            user.token = storage.token;
            user.firstName = storage.firstName;
            user.lastName = storage.lastName;
            user.patronymic = storage.patronymic;
            user.photoPath = storage.photoPath;
        }

        return user;
    }
}