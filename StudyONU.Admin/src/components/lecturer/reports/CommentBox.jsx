import * as React from 'react';

export class CommentBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            items
        } = this.props;

        if (!items || items.length == 0) {
            return null;
        }

        return <p>CommentList</p>;
    }
}