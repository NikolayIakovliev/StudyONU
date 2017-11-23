import * as React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';

import { DateHelper } from '../../shared/date';

export class ReportBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        }
    }

    render() {
        const content = this.getContent();

        return (
            <Paper className={this.props.className}>
                {content}
            </Paper>
        );
    }

    getContent() {
        const {
            reportStatus,
            mark,
            dateOverdue,
            dateAccepted
        } = this.props;

        let content = null;

        if (reportStatus === 1 || reportStatus === 6) {
            content = this.getNotAcceptedContent();
        } else if (reportStatus === 2) {
            content = this.getCancelContent();
        } else if (reportStatus === 3) {
            content = <p>Работа на проверке</p>;
        } else if (reportStatus === 4) {
            content = <p>Работа сдана</p>;
        } else if (reportStatus === 5) {
            content = this.getNotAcceptedContent();
        }

        return content;
    }

    getNotAcceptedContent() {
        const {
            reportStatus,
            dateOverdue
        } = this.props;

        let dateOverdueText = 'Срок сдачи: ';
        dateOverdueText += dateOverdue
            ? DateHelper.ddmmyyyy(dateOverdue, '.')
            : 'неограниченный';

        let reportText = this.getReportText(reportStatus);

        return (
            <div>
                <p>{dateOverdueText}</p>
                <p>{reportText}</p>
                {this.getReportForm()}
            </div>
        );
    }

    getCancelContent() {
        return (
            <div>
                <p>Работа отправлена</p>
                <RaisedButton
                    label="Отменить отправку"
                    secondary={true}
                    onClick={() => this.props.onCancel()}
                />
            </div>
        );
    }

    getReportText(reportStatus) {
        let text = '';

        switch (reportStatus) {
            case 1:
                text = 'Работа ещё не сдана';
                break;
            case 2:
                text = 'Работа отправлена';
                break;
            case 3:
                text = 'Работа на проверке';
                break;
            case 4:
                text = 'Работа сдана';
                break;
            case 5:
                text = 'Работа не утверждена';
                break;
            case 6:
                text = 'Прошёл срок сдачи';
                break;
        }

        return text;
    }

    getReportForm() {
        const file = this.state.file;

        let dropzoneContent = file
            ? <p>Файл загружен: {file.name}</p>
            : <p>Прикрепить файл</p>;

        const disabled = file == null;
        return (
            <div>
                <Dropzone
                    className="dropzone"
                    multiple={false}
                    onDrop={files => this.setState({ file: files[0] })}
                    accept=".docx,.doc,.pdf,.txt">
                    {dropzoneContent}
                </Dropzone>
                <RaisedButton
                    label="Отправить"
                    primary={true}
                    disabled={disabled}
                    style={{ marginTop: 30 }}
                    onClick={() => this.props.onSend(file)}
                />
            </div>
        );
    }
}