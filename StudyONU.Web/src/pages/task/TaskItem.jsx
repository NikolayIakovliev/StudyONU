import * as React from 'react';
import {
    Card,
    CardActions,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {
    List,
    ListItem 
} from 'material-ui/List';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import {
    grey500,
    red500,
    green500,
    orange500
} from 'material-ui/styles/colors';

import { Header } from '../shared/Header';
import { DateHelper } from '../../shared/date';
import { Downloader } from '../../shared/download';

export class TaskItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            reportStatus: props.reportStatus,
            filePaths: props.filePaths,
            dateOverdue: props.dateOverdue,
            className: props.className
        }
    }

    render() {
        const {
            id,
            title,
            filePaths,
            className
        } = this.state;

        const description = this.getDescription();
        const report = this.getReport();

        return (
            <Card className={className}>
                <CardTitle
                    title={title}
                    subtitle={report.text}
                    subtitleColor={report.color}
                    subtitleStyle={{ fontSize: 16 }}
                />
                <Divider />
                <CardText dangerouslySetInnerHTML={{ __html: description }}></CardText>
                {filePaths && filePaths.length > 0 &&
                    <CardText>
                        <List>
                            {
                                filePaths.map((filePath, index) => <ListItem
                                    key={index}
                                    primaryText={`Файл ${index + 1}`}
                                    leftIcon={<FileDownload />}
                                    style={{ border: '1px solid #b9c0cc', marginBottom: 3 }}
                                    onClick={() => Downloader.task(filePath, `${title} ${index + 1}`)} />)
                            }
                        </List>
                    </CardText>
                }
                {this.props.actions &&
                    <CardActions>
                        {this.props.actions}
                    </CardActions>
                }
            </Card>
        )
    }

    getDescription() {
        let description = '';

        if (this.state.description) {
            description += this.state.description;
        }

        return description.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    getReport() {
        const {
            reportStatus,
            dateOverdue
        } = this.state;

        let report = {
            text: '',
            color: ''
        }

        switch (reportStatus) {
            case 1:
                if (dateOverdue) {
                    const format = DateHelper.ddmmyyyy(dateOverdue, '.');
                    if (dateOverdue < DateHelper.nowDate()) {
                        report.text = `Вышел срок сдачи - ${format}`;
                        report.color = red500;
                    } else {
                        report.text = `Не выполнено - необходимо сдать до ${format}`;
                        report.color = grey500;
                    }
                } else {
                    report.text = 'Не выполнено';
                    report.color = grey500;
                }
                break;
            case 2:
                report.text = 'На проверке';
                report.color = orange500;
                break;
            case 3:
                report.text = 'Сдано';
                report.color = green500;
                break;
            case 4:
                report.text = 'Не утверждено';
                report.color = red500;
                break;
        }

        return report;
    }
}