import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { RightIconMenu } from '../../shared/RightIcon';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionClear from 'material-ui/svg-icons/content/clear';
import { blueA200, red500, green500 } from 'material-ui/styles/colors';
import EditorFunctions from 'material-ui/svg-icons/editor/functions';

export class CourseItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;

        const {
            name,
            courseNumber,
            isPublished,
            specialityName
        } = item;

        const rightIcon = RightIconMenu(() => this.props.onEdit(item), () => this.props.onDelete(item.id));
        let publishmentDetails = this.getPublishmentDetails(isPublished);

        return (
            <ListItem
                primaryText={name}
                secondaryText={`${specialityName}, ${courseNumber} курс`}
                leftAvatar={<Avatar icon={<EditorFunctions />} backgroundColor={blueA200} />}
                rightIconButton={rightIcon}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={1}
                        leftAvatar={publishmentDetails.leftAvatar}
                        primaryText={publishmentDetails.text} />
                ]} />
        );
    }

    getPublishmentDetails(isPublished) {
        let details = {
            leftAvatar: null,
            text: ''
        }

        if (isPublished) {
            details.text = 'Курс опубликован';
            details.leftAvatar = <Avatar icon={<ActionDone />} backgroundColor={green500} />;
        } else {
            details.text = 'Курс скрыт';
            details.leftAvatar = <Avatar icon={<ActionClear />} backgroundColor={red500} />;
        }

        return details;
    }
}