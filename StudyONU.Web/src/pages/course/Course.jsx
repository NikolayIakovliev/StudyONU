import * as React from 'react';
import { urls } from '../../shared/api';
import { Header } from '../shared/Header';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ActionSubject from 'material-ui/svg-icons/action/subject';

export class Course extends React.Component {
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

        this.props.get(urls.courses.taskList(this.props.match.params.id), result => {
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
            items
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        const renderTaskTemplate = (item) => {
            const description = this.getReportStatusDescription(item.reportStatus);
            return (
                <Card key={item.id} className="card">
                    <CardTitle title={item.title} subtitle={this.getReportStatusText(item.reportStatusText)} />
                    {item.description}
                    <CardActions>
                        <FlatButton
                            label="Открыть"
                            primary={true}
                            icon={<ActionSubject />}
                            onClick={() => this.props.history.push(`/courses/${item.id}/tasks`)}
                        />
                    </CardActions>
                </Card>
            )
        }

        return (
            <div>
                <Header navigationLinks={navigationLinks} {...this.props} />
                {items.map(item => renderTaskTemplate(item))}
            </div>
        );
    }

    getNavigationLinks() {
        const id = this.props.match.params.id;
        let user = this.props.user;
        return user.isLoggedIn
            ? [
                { to: `/courses/${id}/tasks`, title: 'Задачи' },
                { to: `/courses/${id}/guides`, title: 'Методички' },
                { to: `/courses/${id}/progress`, title: 'Успеваемость' }
            ]
            : null;
    }

    getReportStatusDescription(reportStatus) {
        let description = {
            text: '',
            color: '',
            icon: null
        }

        switch (reportStatus) {

            default:
        }

        return text;
    }
}