import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionDescription from 'material-ui/svg-icons/action/description';

import { lightBlack, blue300 } from 'material-ui/styles/colors';

const iconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon color={lightBlack} />
    </IconButton>
);

export const RightIconButton = (onClick) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem leftIcon={<ActionDescription color={blue300} />} onClick={() => onClick()}>Начать проверку</MenuItem>
    </IconMenu>
);