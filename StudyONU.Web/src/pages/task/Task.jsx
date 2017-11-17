import * as React from 'react';

export class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id
        }
    }

    render() {
        return <p>Hello from task details ({this.state.id})!</p>;
    }
}