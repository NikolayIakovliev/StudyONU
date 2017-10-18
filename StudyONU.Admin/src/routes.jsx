import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { NotFound } from './components/shared/NotFound';
import { Authorization } from './components/shared/Authorization';

import { AdminHome } from './components/admin/home/Home';
import { LecturerList } from './components/admin/lecturers/LecturerList';
import { SpecialityList } from './components/admin/specialities/SpecialityList';

import { LecturerHome } from './components/lecturer/home/Home';
import { CourseList } from './components/lecturer/courses/CourseList';
import { GuideList } from './components/lecturer/guides/GuideList';

const adminRole = 'Admin';
const lecturerRole = 'Lecturer';

const AdminAuthorization = Authorization([adminRole]);
const LecturerAuthorization = Authorization([lecturerRole]);

export class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userRole = this.props.userRole;
        let routes;
        let links;

        if (this.props.userRole == adminRole) {
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
                    <Route exact path='/' component={AdminAuthorization(AdminHome, this.props)} />
                    <Route path='/lecturers' component={AdminAuthorization(LecturerList, this.props)} />
                    <Route path='/specialities' component={AdminAuthorization(SpecialityList, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        } else if (this.props.userRole == lecturerRole) {
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
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={LecturerAuthorization(LecturerHome, this.props)} />
                    <Route exact path='/courses' component={LecturerAuthorization(CourseList, this.props)} />
                    <Route exact path='/guides' component={LecturerAuthorization(GuideList, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        }

        return (
            <Layout allowedLinks={links} {...this.props}>
                {routes}
            </Layout>
        );
    }
}