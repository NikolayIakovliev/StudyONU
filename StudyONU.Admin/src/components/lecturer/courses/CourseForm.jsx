import * as React from 'react';
import { urls } from '../../../shared/api';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { FloatButton } from '../../shared/FloatButton';

import './courseForm.scss';

export class CourseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            courseNumber: 1,
            speciality: null,
            isPublished: false,
            specialities: [],
            formOpened: false,
            errors: {
                name: '',
                speciality: ''
            }
        }
    }

    componentWillMount() {
        this.load();
    }

    load() {
        let self = this;
        this.props.getSpecialities(specialities => {
            self.setState({
                specialities: specialities
            });
        });
    }

    render() {
        const {
            name,
            courseNumber,
            speciality,
            isPublished,
            specialities,
            formOpened,
            errors
        } = this.state;

        const courses = [1, 2, 3, 4, 5, 6];
        //const

        return (
            <div>
                {!formOpened &&
                    FloatButton(() => this.setState({ formOpened: true }))
                }
                {formOpened &&
                    <Paper zDepth={3} className="form-course-container">
                        <Subheader>Новый курс</Subheader>
                        <Divider />
                        <div className="form-course">
                            <TextField
                                className="text-field"
                                floatingLabelText="Название курса"
                                errorText={errors.name}
                                onChange={(e, value) => this.setState({ name: value })}
                                value={name}
                            /><br /><br />
                            <SelectField
                                floatingLabelText="Специальность"
                                errorText={errors.speciality}
                                value={speciality}
                                onChange={(event, index, value) => this.setState({ speciality: value })}>
                                {specialities.map(item => {
                                    return <MenuItem key={item.id} value={item} primaryText={item.name} />;
                                })}
                            </SelectField><br /><br />
                            <SelectField
                                floatingLabelText="Курс"
                                value={courseNumber}
                                onChange={(event, index, value) => this.setState({ courseNumber: value })}>
                                {courses.map(item => {
                                    return <MenuItem key={item} value={item} primaryText={`${item} курс`} />;
                                })}
                            </SelectField><br /><br />
                            <Checkbox
                                label="Опубликовать"
                                checked={isPublished}
                                onCheck={(e, checked) => this.setState({ isPublished: checked })}
                            />
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
                name: this.state.name,
                courseNumber: this.state.courseNumber,
                specialityId: this.state.speciality.id,
                isPublished: this.state.isPublished
            };

            this.props.createItem(data);
            this.resetForm();
        }
    }

    validateForm() {
        const {
            name,
            speciality
        } = this.state;
        let errors = {
            name: '',
            speciality: ''
        }

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
            errors.name = 'От 1 до 100 символов';
        }
        if (!speciality) {
            valid = false;
            errors.speciality = 'Выберите специальность';
        }

        this.setState({ errors: errors });
        return valid;
    }

    resetForm() {
        this.setState({
            name: '',
            courseNumber: 1,
            speciality: null,
            isPublished: false,
            errors: {
                name: '',
                speciality: ''
            }
        });
    }
}