import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { RightIconMenu } from '../../shared/RightIcon';
import Avatar from 'material-ui/Avatar';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionClear from 'material-ui/svg-icons/content/clear';
import { blueA200, red500, green500, orange500, grey500 } from 'material-ui/styles/colors';
import { ddmmyyyy } from '../../../shared/date';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import DeviceAccessTime from 'material-ui/svg-icons/device/access-time';
import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline';
import Download from 'material-ui/svg-icons/file/file-download';

export class TaskItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;

        const options = (item.filePaths && item.filePaths.length > 0) ? [
            {
                title: 'Скачать файлы',
                onClick: () => {
                    let filePaths = item.filePaths;
                    for (let i = 0; i < filePaths.length; i++) {
                        let filePath = filePaths[i];
                        let extension = filePath.substr(filePath.lastIndexOf('.') + 1);

                        let a = document.createElement('a');
                        a.href = filePath;
                        a.target = '_blank';
                        a.download = `Файл ${i + 1}.${extension}`;

                        a.click();
                    }
                },
                leftIcon: <Download />
            }
        ] : null;

        const {
            title,
            description,
            filePaths,
            dateAvailable,
            dateOverdue,
            courseName,
            courseNumber
        } = item;

        const rightIcon = RightIconMenu(() => this.props.onEdit(item), () => this.props.onDelete(item.id), options);
        let availableDetails = this.getAvailableDetails(dateAvailable);
        let overdueDetails = this.getOverdueDetails(dateOverdue);

        return (
            <ListItem
                primaryText={title}
                secondaryText={`${courseName}, ${courseNumber} курс`}
                leftAvatar={<Avatar icon={<ActionViewHeadline />} backgroundColor={blueA200} />}
                rightIconButton={rightIcon}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={1}
                        leftAvatar={availableDetails.leftAvatar}
                        primaryText={availableDetails.text}
                        secondaryText={availableDetails.dateFormat} />,
                    <ListItem
                        key={2}
                        leftAvatar={overdueDetails.leftAvatar}
                        primaryText={overdueDetails.text}
                        secondaryText={overdueDetails.dateFormat} />
                ]} />
        );
    }

    getAvailableDetails(dateAvailable) {
        let details = {
            leftAvatar: null,
            text: '',
            dateFormat: ''
        }

        let now = Date.now();
        if (dateAvailable && dateAvailable > now) {
            let format = ddmmyyyy(dateAvailable, '.');
            details.text = `Будет доступна студентам с ${format}`;
            details.leftAvatar = <Avatar icon={<DeviceAccessTime />} backgroundColor={grey500} />;
            details.dateFormat = format;
        } else {
            details.text = 'Доступна студентам';
            details.leftAvatar = <Avatar icon={<ActionDone />} backgroundColor={green500} />;
        }

        return details;
    }

    getOverdueDetails(dateOverdue) {
        let details = {
            leftAvatar: null,
            text: '',
            dateFormat: ''
        }

        let now = Date.now();
        if (dateOverdue && dateOverdue > now) {
            let format = ddmmyyyy(dateOverdue, '.');
            details.text = `Срок сдачи прошел ${format}`;
            details.leftAvatar = <Avatar icon={<ActionInfoOutline />} backgroundColor={orange500} />;
            details.dateFormat = format;
        } else if (dateOverdue) {
            let format = ddmmyyyy(dateOverdue, '.');
            details.text = `Необходимо сдать до ${format} (включительно)`;
            details.leftAvatar = <Avatar icon={<DeviceAccessTime />} backgroundColor={blueA200} />;
            details.dateFormat = format;
        } else {
            details.text = 'Неограниченный срок сдачи';
            details.leftAvatar = <Avatar icon={<ActionDone />} backgroundColor={green500} />;
        }

        return details;
    }
}