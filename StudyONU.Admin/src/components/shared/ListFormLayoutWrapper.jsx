import * as React from 'react';

import './listFormLayoutWrapper.scss';

export const ListFormLayoutWrapper = (List, Form) => {
    return class WithListFormLayoutWrapper extends React.Component {
        render() {
            return (
                <div className="list-form-container">
                    {List}
                    {Form}
                </div>
            );
        }
    }
}