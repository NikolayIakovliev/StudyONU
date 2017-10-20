import * as React from 'react';

export class TaskItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.item.title}</div>
    }
}