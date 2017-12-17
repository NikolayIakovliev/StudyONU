import * as React from 'react';
import { urls } from '../../../shared/api';
import Dropzone from 'react-dropzone';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FloatButton } from '../../shared/FloatButton';

import DateHelper from '../../../shared/date';

import './guideForm.scss';

export class GuideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            file: null,
            dateAvailable: null,
            course: null,
            courses: [],
            formOpened: false,
            errors: {
                name: '',
                file: '',
                course: ''
            }
        }
    }

    componentWillMount() {
        this.load();
    }

    load() {
        let self = this;
        this.props.getCourses(courses => {
            self.setState({
                courses: courses
            });
        });
    }

    render() {
        const {
            name,
            file,
            dateAvailable,
            course,
            courses,
            formOpened,
            errors
        } = this.state;

        const dropzoneContent = (
            <div>
                {file &&
                    <div>
                        <p>Загруженный файл:</p>
                        <p>{file.name}</p>
                    </div>
                }
                {!file &&
                    <div>
                        <p>Перетащите файл</p>
                        <p>Расширения: .docx, .doc, .xls, .pdf, .txt, .pptx</p>
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
                    <Paper zDepth={3} className="form-guide-container">
                        <Subheader>Новая методичка</Subheader>
                        <Divider />
                        <div className="form-guide">
                            <TextField
                                className="text-field"
                                hintText="Современная математика"
                                floatingLabelText="Название для отображения"
                                errorText={errors.name}
                                onChange={(e, value) => this.setState({ name: value })}
                                value={name}
                            /><br /><br />
                            <Dropzone
                                className="dropzone"
                                multiple={false}
                                onDrop={files => this.setState({ file: files[0] })}
                                accept=".docx,.doc,.xls,.pdf,.txt,.pptx">
                                {dropzoneContent}
                                <span className="validation-error">{errors.file}</span>
                            </Dropzone>
                            <DatePicker
                                hintText="Дата доступа"
                                mode="landscape"
                                value={dateAvailable}
                                onChange={(event, date) => this.setState({ dateAvailable: date })} />
                            <SelectField
                                floatingLabelText="Выберите курс"
                                errorText={errors.course}
                                value={course}
                                onChange={(event, index, value) => this.setState({ course: value })}>
                                {courses.map((course, index) => {
                                    return <MenuItem key={course.id} value={course} primaryText={course.name} />;
                                })}
                            </SelectField>
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
                file: this.state.file,
                dateAvailable: this.state.dateAvailable != null
                    ? DateHelper.yyyymmdd(this.state.dateAvailable, '-')
                    : null,
                courseId: this.state.course.id
            }

            this.props.createItem(data);
            this.resetForm();
        }
    }

    validateForm() {
        const {
            name,
            file,
            course
        } = this.state;
        let errors = {
            name: '',
            file: '',
            course: ''
        }

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
            errors.name = 'От 1 до 100 символов';
        }
        if (!file) {
            valid = false;
            errors.file = 'Выберите файл';
        }
        if (!course) {
            valid = false;
            errors.course = 'Выберите курс';
        }

        this.setState({ errors: errors });
        return valid;
    }

    resetForm() {
        this.setState({
            name: '',
            file: null,
            dateAvailable: null,
            course: null,
            errors: {
                name: '',
                file: '',
                course: ''
            }
        });
    }
}