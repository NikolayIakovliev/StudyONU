import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { RightIconMenu } from '../../shared/RightIcon';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionClear from 'material-ui/svg-icons/content/clear';
import { blueA200, red500, green500 } from 'material-ui/styles/colors';
import { ddmmyyyy } from '../../../shared/date';

export class GuideItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;

        const options = [
            {
                title: 'Скачать',
                onClick: () => {
                    let filePath = item.filePath;
                    let extension = filePath.substr(filePath.lastIndexOf('.') + 1);

                    let a = document.createElement('a');
                    a.href = filePath;
                    a.target = '_blank';
                    a.download = `${item.name}.${extension}`;

                    a.click();
                }
            }
        ];
        const rightIcon = RightIconMenu(() => this.props.onEdit(item), () => this.props.onDelete(item.id), options);

        const {
            name,
            filePath,
            dateCreated,
            dateAvailable,
            courseName,
            courseNumber,
            isPublished
        } = item;

        let publishmentDetails = this.getPublishmentDetails(isPublished);
        let availableDetails = this.getAvailableDetails(dateAvailable);

        return (
            <ListItem
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blueA200} />}
                primaryText={name}
                secondaryText={`${courseName}, ${courseNumber} курс`}
                rightIconButton={rightIcon}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={1}
                        leftAvatar={publishmentDetails.leftAvatar}
                        primaryText={publishmentDetails.text} />,
                    <ListItem
                        key={2}
                        leftAvatar={availableDetails.leftAvatar}
                        primaryText={availableDetails.text}
                        secondaryText={availableDetails.dateFormat} />
                ]} />
        );
    }

    getPublishmentDetails(isPublished) {
        let details = {
            leftAvatar: null,
            text: ''
        }

        if (isPublished) {
            details.text = 'Методичка опубликована';
            details.leftAvatar = <Avatar icon={<ActionDone />} backgroundColor={green500} />;
        } else {
            details.text = 'Методичка не опубликована';
            details.leftAvatar = <Avatar icon={<ActionClear />} backgroundColor={red500} />;
        }

        return details;
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
            details.leftAvatar = <Avatar icon={<ActionClear />} backgroundColor={red500} />;
            details.dateFormat = format;
        } else {
            details.text = 'Доступна студентам';
            details.leftAvatar = <Avatar icon={<ActionDone />} backgroundColor={green500} />;
        }

        return details;
    }
}
