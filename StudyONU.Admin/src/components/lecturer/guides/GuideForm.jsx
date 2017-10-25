import * as React from 'react';
import { urls } from '../../../shared/api';
import { yyyymmdd } from '../../../shared/date';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import Dropzone from 'react-dropzone';

import FileInput from 'react-file-input';

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
        //this.load();
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
        return null;
        const { file } = this.state;

        let options = this.state.courses.map(course => {
            return {
                value: course.id,
                label: course.name
            };
        });

        let dropzoneContent;
        if (file) {
            dropzoneContent = (
                <div>
                    <p>Загруженный файл:</p>
                    <p>{file.name}</p>
                </div>
            );
        } else {
            dropzoneContent = <p>Допустимые расширения: .docx, .doc, .xls, .pdf, .txt</p>;
        }

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
                    <Dropzone multiple={false} onDrop={files => this.setState({ file: files[0] })} accept=".docx,.doc,.xls,.pdf,.txt">
                        {dropzoneContent}
                    </Dropzone>
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
        } else {
            // TODO
            // temp implementation
            console.log('Invalid form');
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