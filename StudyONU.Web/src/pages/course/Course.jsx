import * as React from 'react';

export class Course extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>This is course number {this.props.match.params.id}</div>
    }
}