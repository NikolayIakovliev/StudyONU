import * as React from 'react';
import { yyyymmdd } from '../../../shared/date';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

export class GuideEditDialog extends React.Component {
    constructor(props) {
        super(props);

        const {
            id,
            name,
            dateAvailable
        } = this.props.item;

        this.state = {
            id: id,
            name: name,
            dateAvailable: dateAvailable,
            updateFile: false,
            file: null,
            errors: {
                name: '',
                file: ''
            }
        }
    }

    render() {
        const {
            id,
            name,
            dateAvailable,
            updateFile,
            file,
            errors
        } = this.state;

        let dropzoneContent = (
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
                    floatingLabelText="Название методички"
                    errorText={errors.name}
                    onChange={(e, value) => this.setState({ name: value })}
                    value={name}
                /><br /><br />
                <DatePicker
                    hintText="Дата доступа"
                    mode="landscape"
                    value={dateAvailable}
                    onChange={(event, date) => this.setState({ dateAvailable: date })} /><br /><br />
                <Toggle
                    label="Обновить файл"
                    labelPosition="right"
                    toggled={updateFile}
                    onToggle={(e, checked) => this.setState({ updateFile: checked })} />
                {updateFile &&
                    <Dropzone
                        className="dropzone"
                        multiple={true}
                        onDrop={files => this.setState({ file: files[0] })}
                        accept=".docx,.doc,.xls,.pdf,.txt,.pptx">
                    {dropzoneContent}
                    <span className="validation-error">{errors.file}</span>
                    </Dropzone>
                }
            </MaterialDialog>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const {
                id,
                name,
                dateAvailable,
                updateFile,
                file
            } = this.state;

            let dateAvailableFormat = null;

            if (dateAvailable) {
                dateAvailableFormat = yyyymmdd(dateAvailable, '.');
            }

            const data = {
                id: id,
                name: name,
                dateAvailable: dateAvailableFormat,
                file: file
            };

            this.props.onSubmit(data);
        }
    }

    validateForm() {
        const {
            name,
            file,
            updateFile
        } = this.state;
        let errors = {
            name: '',
            file: ''
        }

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
            errors.name = 'От 1 до 100 символов';
        }
        if (updateFile && !file) {
            valid = false;
            errors.file = 'Выберите файл';
        }

        this.setState({ errors: errors });
        return valid;
    }
}