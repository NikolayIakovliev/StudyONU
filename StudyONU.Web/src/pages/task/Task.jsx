import * as React from 'react';
import { urls } from '../../shared/api';

export class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            courseId: props.match.params.courseId,
            taskDetails: null,
            comments: []
        }
    }

    componentDidMount() {
        let self = this;

        this.props.get(urls.tasks.details(this.state.id), result => {
            self.setState({
                taskDetails: result.data,
                comments: result.data.comments
            });
        });
    }

    render() {
        console.log(this.state);

        return <p>Hello from task details ({this.state.id})!</p>;
    }
}