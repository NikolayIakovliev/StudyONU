import * as React from 'react';

export const PropsWrapper = (WrappedComponent, props) => {
    return class WithPropsWrapper extends React.Component {
        render() {
            return <WrappedComponent {...props} />;
        }
    }
}