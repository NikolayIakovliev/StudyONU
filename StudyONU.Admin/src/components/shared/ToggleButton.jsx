import * as React from 'react';

import './toggleButton.scss';

export class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value } = this.props;
        const classes = this.getClasses(value);

        return <button className={classes.join(" ")} onClick={() => this.props.onToggle(!value)}></button>;
    }

    getClasses(close) {
        let classes = ['toggle-btn'];

        if (!close) {
            classes.push('open');
        }

        return classes;
    }
}