import * as React from 'react';
import { Header } from '../shared/Header';
import { urls } from '../../shared/api';
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

export class Registration extends React.Component {
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
            courseNumber: 1,
            speciality: null,
            specialities: [],
            errors: {
                firstName: '',
                lastName: '',
                patronymic: '',
                photo: null,
                email: '',
                speciality: null
            },
            allowNextStep: false
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let self = this;
        this.props.get(urls.specialities, result => {
            self.setState({
                specialities: result.data
            });
        });
    }

    render() {
        const {
            success,
            stepIndex,
            allowNextStep
        } = this.state;

        const handleNext = this.getNextHandler(stepIndex);
        const stepContent = this.getStepContent(stepIndex);

        return (
            <div>
                <Header {...this.props} />
                <Paper zDepth={3}>
                    <Subheader>Регистрация нового студента</Subheader>
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

    getStepContent(stepIndex) {
        const {
            success,
            firstName,
            lastName,
            patronymic,
            photo,
            email,
            courseNumber,
            speciality,
            specialities,
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
                        <SelectField
                            floatingLabelText="Курс"
                            value={courseNumber}
                            onChange={(event, index, value) => this.setState({ courseNumber: value })}>
                            {courses.map(item => {
                                return <MenuItem key={item} value={item} primaryText={`${item} курс`} />;
                            })}
                        </SelectField><br /><br />
                        <SelectField
                            floatingLabelText="Специальность"
                            errorText={errors.speciality}
                            value={speciality}
                            onChange={(event, index, value) => this.setState({ speciality: value })}>
                            {specialities.map(item => {
                                return <MenuItem key={item.id} value={item} primaryText={item.name} />;
                            })}
                        </SelectField><br />
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
                    : <p>Возникла ошибка при отправке формы. Попробуйте позже или сообщите об этом преподавателю</p>;
        }
    }

    getNextHandler(stepIndex) {
        switch (stepIndex) {
            case 0:
                return () => {
                    let self = this;

                    this.props.post(`${urls.account.checkEmail}?email=${this.state.email}`, null, result => {
                        let errors = { email: '' };
                        let stepIndex = this.state.stepIndex;
                        if (result.success === true) {
                            stepIndex++;
                        } else {
                            errors.email = 'Почта уже используется';
                        }

                        self.setState({ allowNextStep: result.success, errors: errors, stepIndex: stepIndex });
                    });
                }
            case 1:
                return () => {
                    const {
                        firstName,
                        lastName,
                        patronymic,
                        speciality
                    } = this.state;

                    let errors = {
                        firstName: '',
                        lastName: '',
                        patronymic: '',
                        speciality: ''
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
                    if (!speciality) {
                        valid = false;
                        errors.speciality = 'Выберите специальность';
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
            email,
            courseNumber,
            speciality
        } = this.state;

        const data = {
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            photo: photo,
            email: email,
            courseNumber: courseNumber,
            specialityId: speciality.id
        }

        let self = this;
        this.props.postFormData(urls.students, data, result => {
            self.setState({
                success: result.success,
                stepIndex: self.state.stepIndex + 1
            });
        });
    }
}