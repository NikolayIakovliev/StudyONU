import * as React from 'react';

export const Authorization = (roles) => (WrappedComponent, props) => {
    return class WithAuthorization extends React.Component {
        render() {
            let component = roles.includes(props.userRole)
                ? <WrappedComponent {...props} />
                : null;

            return component;
        }
    }
}