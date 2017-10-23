import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { RightIconMenu } from '../../shared/RightIcon';

export class LecturerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        const rightIcon = RightIconMenu(() => this.props.onEdit(item), () => this.props.onDelete(item.id));

        const fullName = `${item.lastName} ${item.firstName} ${item.patronymic}`;
        return (
            <ListItem
                primaryText={fullName}
                leftAvatar={<Avatar src={item.photoPath} />}
                secondaryText={<p>{item.email}</p>}
                rightIconButton={rightIcon} />
        );
    }
}