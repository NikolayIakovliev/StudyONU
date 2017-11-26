import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import {
    lightBlack,
    blue300,
    green500,
    red500
} from 'material-ui/styles/colors';

const sentIconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon color={lightBlack} />
    </IconButton>
);

export const SentRightIconButton = (onClick) => (item) => (
    <IconMenu iconButtonElement={sentIconButtonElement}>
        <MenuItem leftIcon={<ActionDescription color={blue300} />} onClick={() => onClick(item)}>Начать проверку</MenuItem>
    </IconMenu>
);

const checkIconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon />
    </IconButton>
);

export const OnCheckRightIconButton = (onAccept, onReject, onDownload) => (item) => (
    <IconMenu iconButtonElement={checkIconButtonElement}>
        <MenuItem
            style={{ color: green500 }}
            leftIcon={<ActionDone color={green500} />}
            onClick={() => onAccept(item)}
        >
            Утвердить
            </MenuItem>
        <MenuItem
            style={{ color: red500 }}
            leftIcon={<ContentClear color={red500} />}
            onClick={() => onReject(item)}
        >
            Отклонить
            </MenuItem>
        <Divider />
        <MenuItem
            leftIcon={<FileDownload />}
            onClick={() => onDownload(item)}
        >
            Скачать
            </MenuItem>
    </IconMenu>
);