import * as React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import './floatButton.scss';

export const FloatButton = (onClick) => (
    <FloatingActionButton mini={true} className="btn-float-add" onClick={onClick}>
        <ContentAdd />
    </FloatingActionButton>
);