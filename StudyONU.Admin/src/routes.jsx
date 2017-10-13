import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/shared/Layout';
import { AdminHome } from './components/admin/Home';
import { LecturerHome } from './components/lecturer/Home';
import { LecturerList } from './components/admin/LecturerList';
import { Uncounter } from './components/lecturer/Uncounter';
import { Authorization } from './components/shared/Authorization';
import { NotFound } from './components/shared/NotFound';

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
                    title: 'Home',
                    to: '/'
                },
                {
                    title: 'Преподаватели',
                    to: '/lecturers'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={AdminAuthorization(AdminHome, this.props)} />
                    <Route path='/lecturers' component={AdminAuthorization(LecturerList, this.props)} />
                    <Route path='/' component={NotFound} />
                </Switch>
            );
        } else if (this.props.userRole == lecturerRole) {
            links = [
                {
                    title: 'Home',
                    to: '/'
                },
                {
                    title: 'Uncounter',
                    to: '/uncounter'
                }
            ];
            routes = (
                <Switch>
                    <Route exact path='/' component={LecturerAuthorization(LecturerHome, this.props)} />
                    <Route path='/uncounter' component={LecturerAuthorization(Uncounter, this.props)} />
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