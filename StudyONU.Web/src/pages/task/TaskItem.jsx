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
    orange500,
    blue500
} from 'material-ui/styles/colors';

import { Header } from '../shared/Header';
import { DateHelper } from '../../shared/date';
import { Downloader } from '../../shared/download';

export class TaskItem extends React.Component {
    render() {
        const {
            id,
            title,
            filePaths,
            className
        } = this.props;

        const description = this.getDescription();
        const style = this.getDescriptionStyle();
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
                <CardText style={style} dangerouslySetInnerHTML={{ __html: description }}></CardText>
                {this.props.actions &&
                    <CardActions>
                        {this.props.actions}
                    </CardActions>
                }
            </Card>
        )
    }

    getDescriptionStyle() {
        let style = {};

        if (this.props.shortenDescription) {
            style.maxHeight = '80px';
            style.overflowY = 'auto';
        }

        return style;
    }

    getDescription() {
        let description = '';

        if (this.props.description) {
            description += this.props.description;
        }

        return description.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

    getReport() {
        const {
            reportStatus,
            dateOverdue,
            readOnly
        } = this.props;

        let report = {
            text: '',
            color: ''
        }

        if (!readOnly) {
            const format = dateOverdue
                ? DateHelper.ddmmyyyy(dateOverdue, '.')
                : '';

            switch (reportStatus) {
                case 1:
                    report.color = grey500;
                    if (dateOverdue) {
                        report.text = `Не выполнено - необходимо сдать до ${format}`;
                    } else {
                        report.text = 'Не выполнено';
                    }
                    break;
                case 2:
                    report.text = 'Отправлено';
                    report.color = blue500;
                    break;
                case 3:
                    report.text = 'На проверке';
                    report.color = orange500;
                    break;
                case 4:
                    report.text = 'Сдано';
                    report.color = green500;
                    break;
                case 5:
                    report.text = 'Не утверждено';
                    report.color = red500;
                    break;
                case 6:
                    report.text = `Вышел срок сдачи - ${format}`;
                    report.color = red500;
                    break;
            }
        }

        return report;
    }
}