import * as React from 'react';
import { urls } from '../../../shared/api';
import { yyyymmdd } from '../../../shared/date';
import Dropdown from 'react-dropdown';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-date-picker';

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
        const { files } = this.state;

        let options = this.state.courses.map(course => {
            return {
                value: course.id,
                label: course.name
            };
        });

        let dropzoneContent;
        if (files.length) {
            dropzoneContent = (
                <div>
                    <p>Загруженные файлы:</p>
                    <ul>
                        {files.map((file, index) => {
                            return <li key={index}>{file.name}</li>
                        })
                        }
                    </ul>
                </div>
            );
        } else {
            dropzoneContent = <p>Допустимые расширения: .docx, .doc, .xls, .pdf, .txt</p>;
        }

        return (
            <div>
                <div>
                    <label>Заголовок</label>
                    <input type="text" name="title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
                </div>
                <div>
                    <label>Описание</label>
                    <textarea name="description" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                </div>
                <div>
                    <Dropdown options={options} onChange={option => this.setState({ course: option })} value={this.state.course} placeholder="Выберите курс" />
                </div>
                <div>
                    <label>Доступна с</label>
                    <DatePicker locale="ru" value={this.state.dateAvailable} onChange={date => this.setState({ dateAvailable: date })} />
                </div>
                <div>
                    <label>Дата окончательной сдачи</label>
                    <DatePicker locale="ru" value={this.state.dateOverdue} onChange={date => this.setState({ dateOverdue: date })} />
                </div>
                <div>
                    <label>Файлы</label>
                    <Dropzone onDrop={files => this.setState({ files: files })} accept=".docx,.doc,.xls,.pdf,.txt">
                        {dropzoneContent}
                    </Dropzone>
                </div>
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.sendForm(); }}>Создать</button>
                </div>
            </div>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const { title, description, course, files } = this.state;

            let dateAvailable = null;
            let dateOverdue = null;

            if (this.state.dateAvailable) {
                dateAvailable = yyyymmdd(this.state.dateAvailable, '-');
            }
            if (this.state.dateOverdue) {
                dateOverdue = yyyymmdd(this.state.dateOverdue, '-');
            }

            const data = {
                title: title,
                description: description,
                dateAvailable: dateAvailable,
                dateOverdue: dateOverdue,
                courseId: course.value,
                files: files
            };
            
            this.props.createItem(data);
        }
    }

    validateForm() {
        const { title, course } = this.state;

        let valid = true;

        if (title.length < 1 || title.length > 200) {
            valid = false;
        } else if (!course) {
            valid = false;
        }

        return valid;
    }
}