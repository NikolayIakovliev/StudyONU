import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import { FloatButton } from '../../shared/FloatButton';

import DateHelper from '../../../shared/date';

import './taskForm.scss';

export class TaskForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            dateAvailable: null,
            dateOverdue: null,
            course: null,
            files: [],
            courses: [],
            formOpened: false,
            errors: {
                title: '',
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
            title,
            description,
            dateAvailable,
            dateOverdue,
            course,
            files,
            courses,
            formOpened,
            errors
        } = this.state;

        let dropzoneContent = (
            <div>
                {files.length > 0 &&
                    <div>
                        <p>Загруженные файлы:</p>
                        <ul>
                            {files.map((file, index) => {
                                return <li key={index}>{file.name}</li>
                            })
                            }
                        </ul>
                    </div>
                }
                {files.length == 0 &&
                    <div>
                        <p>Перетащите файлы</p>
                        <p>Расширения: .docx, .doc, .xls, .pdf, .txt</p>
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
                    <Paper zDepth={3} className="form-task-container">
                        <Subheader>Новая задача</Subheader>
                        <Divider />
                        <div className="form-task">
                            <TextField
                                className="text-field"
                                floatingLabelText="Заголовок задачи"
                                errorText={errors.title}
                                onChange={(e, value) => this.setState({ title: value })}
                                value={title}
                            /><br />
                            <TextField
                                className="text-multiline-field"
                                floatingLabelText="Описание"
                                onChange={(e, value) => this.setState({ description: value })}
                                value={description}
                                multiLine={true}
                            /><br /><br />
                            <SelectField
                                className="select-field"
                                floatingLabelText="Курс"
                                errorText={errors.course}
                                value={course}
                                onChange={(event, index, value) => this.setState({ course: value })}>
                                {courses.map(item => {
                                    return <MenuItem key={item.id} value={item} primaryText={item.name} />;
                                })}
                            </SelectField><br /><br />
                            <DatePicker
                                className="date-picker"
                                hintText="Дата доступа"
                                mode="landscape"
                                value={dateAvailable}
                                onChange={(event, date) => this.setState({ dateAvailable: date })}
                            /><br />
                            <DatePicker
                                className="date-picker"
                                hintText="Дата необходимой сдачи"
                                mode="landscape"
                                value={dateOverdue}
                                onChange={(event, date) => this.setState({ dateOverdue: date })}
                            /><br /><br />
                            <Dropzone
                                className="dropzone"
                                multiple={true}
                                onDrop={files => this.setState({ files: files })}
                                accept=".docx,.doc,.xls,.pdf,.txt">
                                {dropzoneContent}
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
            const {
                title,
                description,
                dateAvailable,
                dateOverdue,
                course,
                files
            } = this.state;

            let dateAvailableFormat = null;
            let dateOverdueFormat = null;

            if (dateAvailable) {
                dateAvailableFormat = DateHelper.yyyymmdd(dateAvailable, '-');
            }
            if (dateOverdue) {
                dateOverdueFormat = DateHelper.yyyymmdd(dateOverdue, '-');
            }

            const data = {
                title: title,
                description: description,
                dateAvailable: dateAvailableFormat,
                dateOverdue: dateOverdueFormat,
                courseId: course.id,
                files: files
            };
            
            this.props.createItem(data);
            this.resetForm();
        }
    }

    validateForm() {
        const {
            title,
            course
        } = this.state;
        let errors = {
            title: '',
            course: ''
        }

        let valid = true;

        if (title.length < 1 || title.length > 200) {
            valid = false;
            errors.title = 'От 1 до 200 символов';
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
            title: '',
            description: '',
            dateAvailable: null,
            dateOverdue: null,
            course: null,
            files: [],
            errors: {
                title: '',
                course: ''
            }
        });
    }
}