import * as React from 'react';
import { yyyymmdd } from '../../../shared/date';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dropzone from 'react-dropzone';
import Toggle from 'material-ui/Toggle';

import './taskEditDialog.scss';

export class TaskEditDialog extends React.Component {
    constructor(props) {
        super(props);

        const {
            id,
            title,
            description,
            dateAvailable,
            dateOverdue
        } = this.props.item;

        this.state = {
            id: id,
            title: title,
            description: description != null ? description : '',
            dateAvailable: dateAvailable,
            dateOverdue: dateOverdue,
            files: [],
            updateFiles: false,
            errors: {
                title: ''
            }
        }
    }

    render() {
        const {
            id,
            title,
            description,
            dateAvailable,
            dateOverdue,
            files,
            updateFiles,
            errors
        } = this.state;

        let dropzoneContent = (
            <div>
                {files.length > 0 &&
                    <p>Загружено файлов: {files.length}</p>
                }
                {files.length == 0 &&
                    <div>
                        <p>Перетащите файлы</p>
                        <p>Расширения: .docx, .doc, .xls, .pdf, .txt</p>
                    </div>
                }
            </div>
        );

        const actions = (
            <FlatButton
                label="Сохранить"
                primary={true}
                onClick={() => this.sendForm()} />
        );

        return (
            <MaterialDialog
                title={this.props.title}
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
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
                <Toggle
                    label="Обновить файлы"
                    labelPosition="right"
                    toggled={updateFiles}
                    onToggle={(e, checked) => this.setState({ updateFiles: checked })} />
                {updateFiles &&
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        onDrop={files => this.setState({ files: files })}
                        accept=".docx,.doc,.xls,.pdf,.txt">
                        {dropzoneContent}
                    </Dropzone>
                }
            </MaterialDialog>
        );
    }
    // {dropzoneContent}
    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const {
                id,
                title,
                description,
                dateAvailable,
                dateOverdue,
                files,
                updateFiles
            } = this.state;

            let dateAvailableFormat = null;
            let dateOverdueFormat = null;

            if (dateAvailable) {
                dateAvailableFormat = yyyymmdd(dateAvailable, '.');
            }
            if (dateOverdue) {
                dateOverdueFormat = yyyymmdd(dateOverdue, '.');
            }

            const data = {
                id: id,
                title: title,
                description: description,
                dateAvailable: dateAvailableFormat,
                dateOverdue: dateOverdueFormat,
                files: files
            };

            this.props.onSubmit(data, updateFiles);
        }
    }

    validateForm() {
        const {
            title
        } = this.state;
        let errors = {
            title: ''
        }

        let valid = true;

        if (title.length < 1 || title.length > 200) {
            valid = false;
            errors.title = 'От 1 до 200 символов';
        }

        this.setState({ errors: errors });
        return valid;
    }
}