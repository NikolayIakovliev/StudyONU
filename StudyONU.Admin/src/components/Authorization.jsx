﻿import * as React from 'react';

const Authorization = (WrappedComponent, roles) => {
    return class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                role: 'Admin'
            }
        }

        componentWillMount() {

        }

        render() {
            const { role } = this.state;
  
            return (
                <div>
                    {roles.includes(role) &&
                        <WrappedComponent {...this.props} />
                    }
                </div>
            )
        }
    }
}