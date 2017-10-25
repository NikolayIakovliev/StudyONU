import * as React from 'react';
import { ListItem } from 'material-ui/List';
import { RightIconMenu } from '../../shared/RightIcon';

export class GuideItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        const rightIcon = RightIconMenu(() => this.props.onEdit(item), () => this.props.onDelete(item.id));

        return (
            <ListItem primaryText={item.name} rightIconButton={rightIcon} />
        );
    }
}