import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './loading.scss';

export class Loading extends React.Component {
    render() {
        return (
            <div className="loading-progress-container">
                <CircularProgress size={80} thickness={3} />
            </div>
        );
    }
}