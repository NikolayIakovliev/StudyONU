import * as React from 'react';
import Dropzone from 'react-dropzone';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FloatButton } from '../../shared/FloatButton';

import './lecturerForm.scss';

export class LecturerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: null,
            formOpened: false,
            errors: {
                lastName: '',
                firstName: '',
                patronymic: '',
                email: '',
                photo: ''
            }
        }
    }

    render() {
        const {
            lastName,
            firstName,
            patronymic,
            email,
            photo,
            formOpened,
            errors
        } = this.state;

        let dropzoneContent = (
            <div>
                {photo &&
                    <div>
                        <p>Загруженный файл:</p>
                        <p>{photo.name}</p>
                    </div>
                }
                {!photo &&
                    <div>
                        <p>Перетащите фото</p>
                        <p>Расширения: .jpg, .png, .gif, .jpeg</p>
                    </div>
                }
            </div>
        );

        return (
            <div>
                {!formOpened &&
                    FloatButton(() => this.setState({ formOpened: true }))
                }
                {formOpened &&
                    <Paper zDepth={3} className="form-lecturer-container">
                        <Subheader>Новый преподаватель</Subheader>
                        <Divider />
                        <div className="form-lecturer">
                            <TextField
                                className="text-field"
                                hintText="Иванов"
                                floatingLabelText="Фамилия"
                                errorText={errors.lastName}
                                onChange={(e, value) => this.setState({ lastName: value })}
                                value={lastName}
                            /><br /><br />
                            <TextField
                                className="text-field"
                                hintText="Иван"
                                floatingLabelText="Имя"
                                errorText={errors.firstName}
                                onChange={(e, value) => this.setState({ firstName: value })}
                                value={firstName}
                            /><br /><br />
                            <TextField
                                className="text-field"
                                hintText="Иванович"
                                floatingLabelText="Отчество"
                                errorText={errors.patronymic}
                                onChange={(e, value) => this.setState({ patronymic: value })}
                                value={patronymic}
                            /><br /><br />
                            <TextField
                                className="text-field"
                                hintText="ivanov@gmail.com"
                                floatingLabelText="E-Mail"
                                errorText={errors.email}
                                onChange={(e, value) => this.setState({ email: value })}
                                value={email}
                            /><br /><br />
                            <Dropzone
                                className="dropzone"
                                multiple={false}
                                onDrop={files => this.setState({ photo: files[0] })}
                                accept=".jpg,.png,.gif,.jpeg">
                                {dropzoneContent}
                                <span className="validation-error">{errors.photo}</span>
                            </Dropzone>
                            <div className="btn-group">
                                <RaisedButton label="Создать" className="btn-item" primary={true} onClick={e => this.sendForm()} />
                                <RaisedButton label="Закрыть" className="btn-item" secondary={true} onClick={e => this.setState({ formOpened: false })} />
                            </div>
                        </div>
                    </Paper>
                }
            </div>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const data = {
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                patronymic: this.state.patronymic,
                email: this.state.email,
                photo: this.state.photo
            }

            this.props.createItem(data);
            this.resetForm();
        }
    }

    validateForm() {
        const { lastName, firstName, patronymic, email, photo } = this.state;
        let errors = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: ''
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
        if (email.length < 1 || email.length > 254) {
            valid = false;
            errors.email = 'От 1 до 254 символов';
        }
        if (!photo) {
            valid = false;
            errors.photo = 'Фотография обязательна';
        }

        this.setState({ errors: errors });
        return valid;
    }

    resetForm() {
        this.setState({
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: null,
            errors: {
                lastName: '',
                firstName: '',
                patronymic: '',
                email: '',
                photo: ''
            }
        });
    }
}