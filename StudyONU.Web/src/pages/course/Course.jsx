import * as React from 'react';
import { urls } from '../../shared/api';

export class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false,
            displayError: false,
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let self = this;

        this.props.get(urls.courses.taskList(this.props.match.params.id), result => {
            let newState = {
                loaded: true,
                displayError: result.success !== true,
                items: result.success === true
                    ? result.data
                    : []
            }

            if (result.success !== true) {
                this.props.error(result);
            }

            self.setState(newState);
        });
    }

    render() {
        console.log(this.state.items);

        return <div>This is course number {this.props.match.params.id}</div>
    }
}