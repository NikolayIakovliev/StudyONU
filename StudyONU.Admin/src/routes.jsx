import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { NotFound } from './components/shared/NotFound';
import { Authorization } from './components/shared/Authorization';

import { ChangePassword } from './components/shared/ChangePassword';

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

const adminRole = 'Админ';
const lecturerRole = 'Преподаватель';

const AdminAuthorization = Authorization([adminRole]);
const LecturerAuthorization = Authorization([lecturerRole]);

export class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userRole = this.props.user.role;
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
                },
                {
                    title: 'Сменить пароль',
                    to: '/account/password'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={AdminAuthorization(AdminHome, this.props)} />
                    <Route path='/lecturers' component={AdminAuthorization(LecturerList, this.props)} />
                    <Route path='/specialities' component={AdminAuthorization(SpecialityList, this.props)} />
                    <Route path='/account/password' component={AdminAuthorization(ChangePassword, this.props)} />
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
                },
                {
                    title: 'Сменить пароль',
                    to: '/account/password'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={LecturerAuthorization(LecturerHome, this.props)} />
                    <Route path='/courses' component={LecturerAuthorization(CourseList, this.props)} />
                    <Route path='/guides' component={LecturerAuthorization(GuideList, this.props)} />
                    <Route path='/tasks' component={LecturerAuthorization(TaskList, this.props)} />
                    <Route path='/students/queue' component={LecturerAuthorization(StudentQueueList, this.props)} />
                    <Route path='/reports/sent' component={LecturerAuthorization(SentReportBox, this.props)} />
                    <Route path='/reports/oncheck' component={LecturerAuthorization(OnCheckReportBox, this.props)} />
                    <Route path='/course/progress' component={LecturerAuthorization(CourseProgress, this.props)} />
                    <Route path='/account/password' component={LecturerAuthorization(ChangePassword, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        }

        return (
            <Layout navigationLinks={links} {...this.props}>
                {routes}
            </Layout>
        );
    }
}