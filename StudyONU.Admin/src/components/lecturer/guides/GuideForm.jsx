import * as React from 'react';
import { urls } from '../../../shared/api';
import { yyyymmdd } from '../../../shared/date';
import Dropdown from 'react-dropdown';
import FileInput from 'react-file-input';
import DatePicker from 'react-date-picker';

import './guideForm.scss';

export class GuideForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            file: null,
            dateAvailable: null,
            course: null,
            courses: []
        }
    }

    componentWillMount() {
        this.load();
    }

    load() {
        let _this = this;
        this.props.getCourses(courses => {
            _this.setState({
                courses: courses
            });
        });
    }

    render() {
        let options = this.state.courses.map(course => {
            return {
                value: course.id,
                label: course.name
            };
        });

        return (
            <div>
                <div>
                    <label>Название</label>
                    <input type="text" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div>
                    <Dropdown options={options} onChange={option => this.setState({ course: option })} value={this.state.course} placeholder="Выберите специальность" />
                </div>
                <div>
                    <label>Файл</label>
                    <FileInput
                        name="file"
                        accept=".docx,.doc,.xls,.pdf,.txt"
                        placeholder="Attach Document"
                        onChange={e => this.setState({ file: e.target.files[0] })}
                        className="file-input" />
                </div>
                <label>Доступна с</label>
                <DatePicker locale="ru" value={this.state.dateAvailable} onChange={date => this.setState({ dateAvailable: date })} />
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.sendForm(); }}>Создать</button>
                </div>
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
                    ? yyyymmdd(this.state.dateAvailable, '-')
                    : null,
                courseId: this.state.course.value
            }
            
            this.props.createItem(data);
        }
    }

    validateForm() {
        const { name, file, course } = this.state;

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
        } else if (!file) {
            valid = false;
        } else if (!course) {
            valid = false;
        }

        return valid;
    }
}