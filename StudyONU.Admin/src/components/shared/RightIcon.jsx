import * as React from 'react';
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

export const RightIconMenu = (onEditClick, onDeleteClick) => (
    <IconMenu iconButtonElement={iconButtonElement} touchTapCloseDelay={100}>
        <MenuItem onClick={onEditClick}>Редактировать</MenuItem>
        <MenuItem onClick={onDeleteClick}>Удалить</MenuItem>
    </IconMenu>
);