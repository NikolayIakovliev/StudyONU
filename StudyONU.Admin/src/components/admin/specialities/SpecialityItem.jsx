import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltipPosition="bottom-left">
        <MoreVertIcon color={lightBlack} />
    </IconButton>
);

const rightIconMenu = (onEditClick, onDeleteClick) => (
    <IconMenu iconButtonElement={iconButtonElement} touchTapCloseDelay={100}>
        <MenuItem onClick={onEditClick}>Редактировать</MenuItem>
        <MenuItem onClick={onDeleteClick}>Удалить</MenuItem>
    </IconMenu>
);

export class SpecialityItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: props.item
        }
    }

    render() {
        const { id, name } = this.state.item;
        const rightIcon = rightIconMenu(() => this.props.onEdit(this.state.item), () => this.props.onDelete(id));

        return (
            <ListItem primaryText={name} rightIconButton={rightIcon} />
        );
    }
}