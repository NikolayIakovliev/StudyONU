import * as React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import './filter.scss';

export class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            items,
            value,
            defaultText,
            onChange
        } = this.props;

        return (
            <Toolbar className="toolbar">
                <ToolbarGroup firstChild={true}>
                    <DropDownMenu value={value} onChange={(e, index, value) => onChange(value)}>
                        <MenuItem value={null} primaryText={defaultText} />
                        {items.map(item => <MenuItem key={item.id} value={item.id} primaryText={item.label} />)}
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}