import * as React from 'react';

export class Uncounter extends React.Component {
    constructor() {
        super();
        this.state = { currentCount: 100 };
    }

    render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.state.currentCount}</strong></p>

            <button onClick={() => { this.decrementCounter() }}>Decrement</button>
        </div>;
    }

    decrementCounter() {
        this.setState({
            currentCount: this.state.currentCount - 1
        });
    }
}
