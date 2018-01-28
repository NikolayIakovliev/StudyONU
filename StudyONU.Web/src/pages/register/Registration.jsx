import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import { Header } from '../shared/Header';

import './registration.scss';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user.isLoggedIn) {
            return <Redirect to='/account' />;
        }

        let navigationLinks = this.getNavigationLinks();

        return (
            <div>
                <Header navigationLinks={navigationLinks} {...this.props} />
                <Paper zDepth={3} className="registration-selection">
                    <div className="registration-wrapper">
                        <h1 className="registration-title">Выберите свою роль</h1>
                        <div className="registration-cards">
                            <Link className="registration-card" to="/register/lecturer">
                                <div className="registration-card-content">
                                    <h2 className="registration-card-title">Преподаватель</h2>
                                    <img className="registration-card-img" src="/images/registration/lecturer.png" />
                                </div>
                            </Link>
                            <Link className="registration-card" to="/register/student">
                                <div className="registration-card-content">
                                    <h2 className="registration-card-title">Студент</h2>
                                    <img className="registration-card-img" src="/images/registration/student.png" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }

    getNavigationLinks() {
        return [
            { to: '/register/student', title: 'Студент' },
            { to: '/register/lecturer', title: 'Преподаватель' }
        ];
    }
}