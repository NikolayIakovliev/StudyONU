﻿import * as React from 'react';

export class Counter extends React.Component {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    render() {
        return <div>
            <p>Current count: <strong>{this.state.currentCount}</strong></p>
            <button onClick={() => { this.incrementCounter() }}>Increment</button>
        </div>;
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}