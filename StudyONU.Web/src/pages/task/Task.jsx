import * as React from 'react';
import { urls } from '../../shared/api';
import { Header } from '../shared/Header';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import { grey500, red500, green500, orange500 } from 'material-ui/styles/colors';

export class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            courseId: props.match.params.courseId,
            taskDetails: null,
            comments: []
        }
    }

    componentDidMount() {
        let self = this;

        this.props.get(urls.tasks.details(this.state.id), result => {
            self.setState({
                taskDetails: result.data,
                comments: result.data.comments
            });
        });
    }

    render() {
        const {
            id,
            courseId,
            taskDetails,
            comments
        } = this.state;

        let navigationLinks = this.getNavigationLinks(courseId);

        // TODO
        // Replace by Loading
        if (taskDetails == null) {
            return null;
        }

        const courseViewModel = this.getReportStatusViewModel(taskDetails.reportStatus);

        return (
            <div>
                <Header navigationLinks={navigationLinks} backLink={`/courses/${courseId}/tasks`} {...this.props} />
                <Card>
                    <CardTitle title={taskDetails.title} subtitle={courseViewModel.text} subtitleColor={courseViewModel.color} subtitleStyle={{ fontSize: 16 }} />
                    <Divider />
                    <CardText dangerouslySetInnerHTML={{ __html: taskDetails.description }}></CardText>
                    {taskDetails.filePaths && taskDetails.filePaths.length > 0 &&
                        <CardText>
                            <List>
                            {taskDetails.filePaths.map((filePath, index) => {
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
                </Card>
            </div>
        );
    }

    getNavigationLinks(courseId) {
        return [
            { to: `/courses/${courseId}/tasks`, title: 'Задачи' },
            { to: `/courses/${courseId}/guides`, title: 'Методички' },
            { to: `/courses/${courseId}/progress`, title: 'Успеваемость' }
        ];
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
}