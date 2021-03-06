﻿import * as React from 'react';
import { Redirect } from 'react-router-dom';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';
import Avatar from 'material-ui/Avatar';
import ActionDone from 'material-ui/svg-icons/action/done';

import { Header } from '../../shared/Header';
import { urls } from '../../../shared/api';

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: null,
            stepIndex: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            photo: null,
            email: '',
            errors: {
                firstName: '',
                lastName: '',
                patronymic: '',
                photo: null,
                email: ''
            },
            allowNextStep: false
        }
    }

    render() {
        if (this.props.user.isLoggedIn) {
            return <Redirect to='/account' />;
        }

        const {
            success,
            stepIndex,
            allowNextStep
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        const handleNext = this.getNextHandler(stepIndex);
        const stepContent = this.getStepContent(stepIndex);

        return (
            <div>
                <Header navigationLinks={navigationLinks} {...this.props} />
                <Paper zDepth={3}>
                    <Subheader>Регистрация нового преподавателя</Subheader>
                    <Divider />
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Почта</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Основные данные</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Фотография</StepLabel>
                        </Step>
                    </Stepper>
                    <div style={{ padding: 20, paddingTop: 0 }}>
                        {stepContent}
                        {success == null &&
                            <div style={{ paddingTop: 30 }}>
                                <FlatButton
                                    label="Назад"
                                    disabled={stepIndex === 0}
                                    onClick={() => this.setState({ stepIndex: stepIndex - 1 })}
                                    style={{ marginRight: 12 }}
                                />
                                <RaisedButton
                                    label={stepIndex === 2 ? 'Отправить заявку' : 'Далее'}
                                    primary={true}
                                    onClick={handleNext}
                                    disabled={!allowNextStep}
                                />
                            </div>
                        }
                    </div>
                </Paper>
            </div>
        );
    }

    getNavigationLinks() {
        return [
            { to: '/register/student', title: 'Студент' },
            { to: '/register/lecturer', title: 'Преподаватель' }
        ];
    }

    getStepContent(stepIndex) {
        const {
            success,
            firstName,
            lastName,
            patronymic,
            photo,
            email,
            courseNumber,
            errors
        } = this.state;

        switch (stepIndex) {
            case 0:
                const validateEmail = email => {
                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return regex.test(email);
                }
                return (
                    <div>
                        <p>Пожалуйста, укажите свою почту</p>
                        <TextField
                            floatingLabelText="E-Mail"
                            errorText={errors.email}
                            value={email}
                            onChange={(e, value) => this.setState({ email: value, allowNextStep: validateEmail(value) })}
                        /><br />
                    </div>
                );
            case 1:
                const courses = [1, 2, 3, 4, 5, 6];

                return (
                    <div>
                        <p>Расскажите о себе</p>
                        <TextField
                            floatingLabelText="Фамилия"
                            errorText={errors.lastName}
                            value={lastName}
                            onChange={(e, value) => this.setState({ lastName: value })}
                        /><br />
                        <TextField
                            floatingLabelText="Имя"
                            errorText={errors.firstName}
                            value={firstName}
                            onChange={(e, value) => this.setState({ firstName: value })}
                        /><br />
                        <TextField
                            floatingLabelText="Отчество"
                            errorText={errors.patronymic}
                            value={patronymic}
                            onChange={(e, value) => this.setState({ patronymic: value })}
                        /><br />
                    </div>
                );
            case 2:
                const dropzoneContent = (
                    <div>
                        {photo && <p>Выбрать другую фотографию</p>}
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
                        {!photo && <p>Загрузите фотографию</p>}
                        {photo &&
                            <div style={{ marginBottom: 30 }}>
                                <p>Подходит? Можно выбрать другую фотографию</p>
                                <Avatar size={70} src={photo.preview} />
                            </div>
                        }
                        <Dropzone
                            style={{ maxWidth: 400 }}
                            className="dropzone"
                            multiple={false}
                            onDrop={files => this.setState({ photo: files[0] })}
                            accept=".jpg,.png,.gif,.jpeg">
                            {dropzoneContent}
                            <span className="validation-error">{errors.photo}</span>
                        </Dropzone>
                    </div>
                );
            default:
                return success
                    ? <p>Ваша заявка успешно отправлена!</p>
                    : <p>Возникла ошибка при отправке формы. Попробуйте позже или сообщите об этом администратору</p>;
        }
    }

    getNextHandler(stepIndex) {
        switch (stepIndex) {
            case 0:
                const validateEmailProvider = () => {
                    let valid = true;
                    let error = '';

                    let domains = [
                        'mail.ru',
                        'rambler.ru',
                        'mvrht.net',
                        'aegde.com',
                        'arockee.com',
                        '10minutemail.co.uk',
                        'kuiqa.com',
                        'wimsg.com',
                        '10minutemail.be',
                        'my10minutemail.com',
                        '20email.eu',
                        'qocya.com'
                    ];

                    for (let i = 0; i < domains.length; i++) {
                        let domain = domains[i];

                        if (this.state.email.endsWith(`@${domain}`)) {
                            valid = false;
                            error = `Домен ${domain} запрещен`;
                            break;
                        }
                    }

                    return {
                        success: valid,
                        error: error
                    };
                }

                return () => {
                    let validation = validateEmailProvider();
                    if (validation.success) {
                        let self = this;

                        this.props.post(`${urls.account.checkLecturerEmail}?email=${this.state.email}`, null, result => {
                            let stepIndex = this.state.stepIndex + 1;
                            let errors = { email: '' };

                            self.setState({ allowNextStep: true, stepIndex: stepIndex, errors: errors });
                        }, result => {
                            let errors = { email: 'Почта уже используется' };
                            self.setState({ errors });
                        });
                    } else {
                        let errors = { email: validation.error };
                        this.setState({ errors });
                    }
                }
            case 1:
                return () => {
                    const {
                        firstName,
                        lastName,
                        patronymic
                    } = this.state;

                    let errors = {
                        firstName: '',
                        lastName: '',
                        patronymic: ''
                    }

                    let valid = true;
                    let stepIndex = this.state.stepIndex;

                    if (firstName.length < 1 || firstName.length > 20) {
                        valid = false;
                        errors.firstName = 'От 1 до 20 символов';
                    }
                    if (lastName.length < 1 || lastName.length > 20) {
                        valid = false;
                        errors.lastName = 'От 1 до 20 символов';
                    }
                    if (patronymic.length < 1 || patronymic.length > 20) {
                        valid = false;
                        errors.patronymic = 'От 1 до 20 символов';
                    }

                    if (valid) {
                        stepIndex++;
                    }
                    this.setState({
                        errors: errors,
                        stepIndex: stepIndex
                    });
                }
            case 2:
                return () => {
                    const {
                        photo
                    } = this.state;

                    let errors = {
                        photo: ''
                    }

                    let valid = true;

                    if (!photo) {
                        valid = false;
                        errors.photo = 'Необходимо загрузить фотографию';
                    }

                    if (valid) {
                        this.sendForm();
                    }

                    this.setState({
                        errors: errors
                    });
                }
            default:
                return () => { }
        }
    }

    sendForm() {
        const {
            firstName,
            lastName,
            patronymic,
            photo,
            email
        } = this.state;

        const data = {
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            photo: photo,
            email: email
        }

        let self = this;
        this.props.postFormData(urls.lecturers, data, result => {
            self.setState({
                success: result.success,
                stepIndex: self.state.stepIndex + 1
            });
        });
    }
}