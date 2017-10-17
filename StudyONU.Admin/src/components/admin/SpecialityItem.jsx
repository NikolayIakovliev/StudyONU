import * as React from 'react';

export class SpecialityItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.item.name}</div>
    }
}