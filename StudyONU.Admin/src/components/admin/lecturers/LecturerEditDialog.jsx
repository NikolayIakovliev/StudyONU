import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './lecturerEditDialog.scss';

export class LecturerEditDialog extends React.Component {
    constructor(props) {
        super(props);

        const item = props.item;

        this.state = {
            id: item.id,
            lastName: item.lastName,
            firstName: item.firstName,
            patronymic: item.patronymic,
            errors: {
                lastName: '',
                firstName: '',
                patronymic: ''
            }
        }
    }

    render() {
        const {
            lastName,
            firstName,
            patronymic,
            errors
        } = this.state;

        const actions = (
            <FlatButton
                label="Сохранить"
                primary={true}
                onClick={() => this.sendForm()} />
        );

        return (
            <Dialog
                title="Редактирование"
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
                <p>{this.props.message}</p>
                <TextField
                    className="text-field"
                    floatingLabelText="Фамилия"
                    errorText={errors.lastName}
                    onChange={(e, value) => this.setState({ lastName: value })}
                    value={lastName}
                /><br /><br />
                <TextField
                    className="text-field"
                    floatingLabelText="Имя"
                    errorText={errors.firstName}
                    onChange={(e, value) => this.setState({ firstName: value })}
                    value={firstName}
                /><br /><br />
                <TextField
                    className="text-field"
                    floatingLabelText="Отчество"
                    errorText={errors.patronymic}
                    onChange={(e, value) => this.setState({ patronymic: value })}
                    value={patronymic}
                /><br /><br />
            </Dialog>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const data = {
                id: this.state.id,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                patronymic: this.state.patronymic
            }

            this.props.onSubmit(data);
        }
    }

    validateForm() {
        const { lastName, firstName, patronymic } = this.state;
        let errors = {
            lastName: '',
            firstName: '',
            patronymic: ''
        }

        let valid = true;

        if (lastName.length < 1 || lastName.length > 20) {
            valid = false;
            errors.lastName = 'От 1 до 20 символов';
        }
        if (firstName.length < 1 || firstName.length > 20) {
            valid = false;
            errors.firstName = 'От 1 до 20 символов';
        }
        if (patronymic.length < 1 || patronymic.length > 20) {
            valid = false;
            errors.patronymic = 'От 1 до 20 символов';
        }

        this.setState({ errors: errors });
        return valid;
    }
}