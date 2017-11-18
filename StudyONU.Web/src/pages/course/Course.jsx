import * as React from 'react';
import { urls } from '../../shared/api';
import { Header } from '../shared/Header';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import ActionSubject from 'material-ui/svg-icons/action/subject';
import { grey500, red500, green500, orange500 } from 'material-ui/styles/colors';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import './course.scss';

export class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            loaded: false,
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
            self.setState({
                courseInfo: result.data
            });
        });

        // TODO
        // Move to another file
        const toDate = (yyyyMMdd, divider) => {
            let parts = yyyyMMdd.split(divider);

            return new Date(parts[0], parts[1] - 1, parts[2]);
        }

        this.props.get(urls.courses.taskList(id), result => {
            self.setState({
                loaded: true,
                tasks: result.data.map(task => {
                    if (task.dateOverdue) {
                        task.dateOverdue = toDate(task.dateOverdue, '.');
                    }

                    return task;
                })
            });
        });
    }

    render() {
        const {
            tasks,
            courseInfo
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        const renderTaskTemplate = (task) => {
            let description = task.description ? task.description + '' : '';
            task.description = description.replace(/(?:\r\n|\r|\n)/g, '<br />');

            const courseViewModel = this.getReportStatusViewModel(task);
            return (
                <Card key={task.id} className="task-item">
                    <CardTitle title={task.title} subtitle={courseViewModel.text} subtitleColor={courseViewModel.color} subtitleStyle={{ fontSize: 16 }} />
                    <Divider />
                    <CardText dangerouslySetInnerHTML={{ __html: task.description }}></CardText>
                    {task.filePaths && task.filePaths.length > 0 &&
                        <CardText>
                            <List>
                                {task.filePaths.map((filePath, index) => {
                                    return <ListItem key={index} primaryText={`Файл ${index + 1}`} leftIcon={<FileDownload />} style={{ border: '1px solid #b9c0cc', marginBottom: 3 }} onClick={() => {
                                        let extension = filePath.substr(filePath.lastIndexOf('.') + 1);

                                        let a = document.createElement('a');
                                        a.href = filePath;
                                        a.target = '_blank';
                                        a.download = '';

                                        // TODO
                                        // implement download by file name
                                        // a.download = `${courseInfo.name}_${index + 1}.${extension}`;

                                        a.click();
                                    }} />;
                                })}
                            </List>
                        </CardText>
                    }
                    <CardActions>
                        <FlatButton
                            disabled={courseInfo.readOnly}
                            label="Детали"
                            primary={true}
                            icon={<ActionSubject />}
                            onClick={() => this.props.history.push(`/courses/${this.props.match.params.id}/tasks/${task.id}`)}
                        />
                    </CardActions>
                </Card>
            )
        }

        return (
            <div>
                <Header navigationLinks={navigationLinks} backLink={this.props.user.isLoggedIn ? '/courses/my' : '/courses/public'} {...this.props} />
                {this.getCourseInfo(courseInfo)}
                <div className="task-list">
                    {tasks.map(task => renderTaskTemplate(task))}
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

    getReportStatusViewModel(task) {
        const {
            reportStatus,
            dateOverdue
        } = task;

        let viewModel = {
            text: '',
            color: ''
        }

        // TODO
        // Move to another file
        const ddmmyyyy = (date, divider) => {
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            return [
                (dd > 9 ? '' : '0') + dd,
                (mm > 9 ? '' : '0') + mm,
                date.getFullYear()
            ].join(divider);
        };

        switch (reportStatus) {
            case 1:
                if (dateOverdue && dateOverdue >=Date.now()) {
                    viewModel.text = `Вышел срок сдачи - ${ddmmyyyy(dateOverdue, '.')}`;
                    viewModel.color = red500;
                } else {
                    viewModel.text = 'Не выполнено' + (dateOverdue ? ` - необходимо сдать до ${ddmmyyyy(dateOverdue, '.')}` : '');
                    viewModel.color = grey500;
                }
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
        }

        return viewModel;
    }

    getCourseInfo(courseInfo) {
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
