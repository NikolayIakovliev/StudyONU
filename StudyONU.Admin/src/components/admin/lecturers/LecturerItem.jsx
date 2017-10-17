import * as React from 'react';

export class LecturerItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.item.fullName}</div>
    }
}