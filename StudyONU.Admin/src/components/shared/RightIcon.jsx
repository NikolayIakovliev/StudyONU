import * as React from 'react';
import { lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Divider from 'material-ui/Divider';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltipPosition="bottom-left">
        <MoreVertIcon color={lightBlack} />
    </IconButton>
);

export const RightIconMenu = (onEditClick, onDeleteClick, options) => (
    <IconMenu iconButtonElement={iconButtonElement} touchTapCloseDelay={100}>
        <MenuItem onClick={onEditClick} leftIcon={<EditorModeEdit />}>Редактировать</MenuItem>
        <MenuItem onClick={onDeleteClick} leftIcon={<ActionDelete />}>Удалить</MenuItem>
        {options && <Divider />}
        {options && options.map((option, index) => {
            return <MenuItem key={index} onClick={option.onClick} leftIcon={option.leftIcon}>{option.title}</MenuItem>
        })}
    </IconMenu>
);