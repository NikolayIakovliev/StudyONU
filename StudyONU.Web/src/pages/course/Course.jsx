import * as React from 'react';
import { urls } from '../../shared/api';
import { Header } from '../shared/Header';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ActionSubject from 'material-ui/svg-icons/action/subject';
import { grey500, red500, green500, orange500 } from 'material-ui/styles/colors';

import './course.scss';

export class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false,
            displayError: false,
            courseInfo: null
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let self = this;
        const id = this.props.match.params.id;

        this.props.get(urls.courses.details(id), result => {
            let newState = {
                displayError: result.success !== true,
                courseInfo: result.data
            }

            if (result.success !== true) {
                this.props.error(result);
            }

            self.setState(newState);
        });

        this.props.get(urls.courses.taskList(id), result => {
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
            courseInfo
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        const renderTaskTemplate = (item) => {
            let description = item.description ? item.description + '' : '';
            item.description = description.replace(/(?:\r\n|\r|\n)/g, '<br />');

            const courseViewModel = this.getReportStatusViewModel(item.reportStatus);
            return (
                <Card key={item.id} className="task-item">
                    <CardTitle title={item.title} subtitle={courseViewModel.text} subtitleColor={courseViewModel.color} subtitleStyle={{ fontSize: 16 }} />
                    <Divider />
                    <CardText dangerouslySetInnerHTML={{ __html: item.description }}></CardText>
                    <CardActions>
                        <FlatButton
                            label="Детали"
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
                <Header navigationLinks={navigationLinks} backLink="/courses/public" {...this.props} />
                {this.getCourseInfo(courseInfo)}
                <div className="task-list">
                    {items.map(item => renderTaskTemplate(item))}
                </div>
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

    getReportStatusViewModel(reportStatus) {
        let viewModel = {
            text: '',
            color: ''
        }

        switch (reportStatus) {
            case 1:
                viewModel.text = 'Не выполнено';
                viewModel.color = grey500;
                break;
            case 2:
                viewModel.text = 'На проверке';
                viewModel.color = orange500;
                break;
            case 3:
                viewModel.text = 'Сдано';
                viewModel.color = green500;
                break;
            case 4:
                viewModel.text = 'Не утверждено';
                viewModel.color = red500;
                break;
            case 5:
                viewModel.text = 'Вышел срок сдачи';
                viewModel.color = red500;
                break;
        }

        return viewModel;
    }

    getCourseInfo(courseInfo) {
        console.log(courseInfo);

        return courseInfo
            ? (
                <div className="course-info">
                    <h2 className="title">{courseInfo.name}</h2>
                    <p className="speciality">{`${courseInfo.specialityName}, ${courseInfo.courseNumber} курс`}</p>
                    <div className="lecturer-info">
                        <img className="lecturer-photo" src={courseInfo.lecturerPhotoPath} />
                        <span className="lecturer-name">{courseInfo.lecturerFullName}</span>
                    </div>
                </div>
            )
            : (
                <p>Загрузка...</p>
            );
    }
}
