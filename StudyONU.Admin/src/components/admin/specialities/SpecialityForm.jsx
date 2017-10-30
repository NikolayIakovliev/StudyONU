import * as React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FloatButton } from '../../shared/FloatButton';

import './specialityForm.scss';

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
        let render = this.state.formOpened
            ? (
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
            )
            : FloatButton(() => this.setState({ formOpened: true }));

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

        if (name.length < 1 || name.length > 100) {
            valid = false;
            errors.name = 'От 1 до 100 символов';
        }

        this.setState({ errors: errors });
        return valid;
    }
}