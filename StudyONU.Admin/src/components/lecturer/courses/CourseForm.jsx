import * as React from 'react';
import { urls } from '../../../shared/api';

export class CourseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            courseNumber: 1,
            isPublished: false,
            specialityId: 0
        }
    }

    render() {
        return (
            <div>Course form</div>
        );
    }
}