import * as React from 'react';
import { Redirect } from 'react-router';
import { urls } from '../../../shared/api';
import { AlertConnection } from '../../shared/AlertConnection';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Header } from '../../shared/Header';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionSubject from 'material-ui/svg-icons/action/subject';

import './myCourses.scss';

export class MyCourses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false,
            displayError: false,
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let self = this;

        this.props.get(urls.courses.my, result => {
            let newState = {
                loaded: true,
                displayError: result.success !== true,
                items: result.success === true
                    ? result.data
                    : []
            }

            if (result.success !== true) {
                this.props.error(result);
            }

            self.setState(newState);
        });
    }

    render() {
        const {
            items,
            itemsPublished,
            loaded,
            displayError
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        return (
            <div>
                <Header navigationLinks={navigationLinks} {...this.props} />
                {items.length > 0 &&
                    <div className="cards">
                    {items.map(item => this.getCard(item, <CardText color="red">Курс обязателен для прохождения</CardText>))}
                        <AlertConnection open={displayError} onClose={() => this.setState({ displayError: false })} />
                    </div>
                }
            </div>
        );
    }

    getNavigationLinks() {
        let user = this.props.user;
        return user.isLoggedIn
            ? [
                { to: '/courses/public', title: 'Опубликованные курсы' },
                { to: '/courses/my', title: 'Мои курсы' }
            ]
            : null;
    }

    getCard(item, cardText) {
        return <Card key={item.id} className="card">
            <CardHeader
                title={item.lecturerFullName}
                subtitle={item.lecturerEmail}
                avatar={`http://localhost:28387${item.lecturerPhotoPath}`}
            />
            <Divider />
            <CardTitle title={item.name} subtitle={`${item.specialityName}, ${item.courseNumber} курс`} />
            {cardText}
            <CardActions>
                <FlatButton
                    label="Открыть"
                    primary={true}
                    icon={<ActionSubject />}
                    onClick={() => this.props.history.push(`/courses/${item.id}`)}
                />
            </CardActions>
        </Card>
    }
}