import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import FileDownload from 'material-ui/svg-icons/file/file-download';

import {
    lightBlack
} from 'material-ui/styles/colors';

const iconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon color={lightBlack} />
    </IconButton>
);

export const RightIconButton = (onClick) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem leftIcon={<FileDownload color={lightBlack} />} onClick={() => onClick()}>Скачать</MenuItem>
    </IconMenu>
);