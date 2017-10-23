import * as React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

import './specialityForm.scss';

const Button = (onClick) => (
    <FloatingActionButton mini={true} className="btn-float-add" onClick={onClick}>
        <ContentAdd />
    </FloatingActionButton>
);

export class SpecialityForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            formOpened: false,
            errors: {
                name: ''
            }
        }
    }

    render() {
        let render = !this.state.formOpened
            ? Button(() => this.setState({ formOpened: true }))
            : (
                <Paper zDepth={3} className="form">
                    <TextField
                        hintText="Например, ФИТ"
                        floatingLabelText="Название специальности"
                        errorText={this.state.errors.name}
                        onChange={(e, value) => this.setState({ name: value })}
                        value={this.state.name}
                    />
                    <div className="btn-group">
                        <RaisedButton label="Создать" className="btn-item" primary={true} onClick={e => this.sendForm()} />
                        <RaisedButton label="Закрыть" className="btn-item" secondary={true} onClick={e => this.setState({ formOpened: false })} />
                    </div>
                </Paper>
            );

        return render;

    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            this.props.createItem(this.state.name);
            this.setState({
                name: ''
            });
        }
    }

    validateForm() {
        const { name } = this.state;
        let errors = {
            name: ''
        }

        let valid = true;

        if (name.length < 1 || name.length > 20) {
            valid = false;
            errors.name = 'От 1 до 20 символов';
        }

        this.setState({ errors: errors });
        return valid;
    }
}