import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { green500, red500 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';

export default class LecturerList extends React.Component {
    render() {
        const {
            items,
            onSelect
        } = this.props;

        const iconButtonElement = (
            <IconButton touch={true}>
                <MoreVertIcon />
            </IconButton>
        );

        const rightIconMenu = (id) => (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem style={{ color: green500 }} leftIcon={<ActionDone color={green500} />} onClick={() => onSelect(id, true)}>Утвердить</MenuItem>
                <MenuItem style={{ color: red500 }} leftIcon={<ContentClear color={red500} />} onClick={() => onSelect(id, false)}>Отклонить</MenuItem>
            </IconMenu>
        );

        return (
            <div>
                <List>
                    {items.map(item =>
                        <ListItem
                            leftAvatar={<Avatar src={item.photoPath} />}
                            rightIconButton={rightIconMenu(item.id)}
                            primaryText={`${item.lastName} ${item.firstName} ${item.patronymic}`}
                            secondaryText={item.email}
                        />
                    )}
                </List>
            </div>
        );
    }
}
