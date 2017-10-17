import * as React from 'react';

export class CourseItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.item.name}</div>
    }
}