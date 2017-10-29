import * as React from 'react';

import './emptyContent.scss';

export class EmptyContent extends React.Component {
    render() {
        return (
            <div className="empty-content-wrapper">
                <div className="empty-content-title-container">
                    <h3>{this.props.title}</h3>
                </div>
                <p className="empty-content-message">{this.props.message}</p>
            </div>
        );
    }
}
