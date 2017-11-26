import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export class MarkModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mark: '',
            error: ''
        }
    }

    render() {
        const {
            mark,
            error
        } = this.state;

        const actions = [
            <FlatButton
                label="Утвердить"
                primary={true}
                onClick={() => this.validate()}
            />,
            <FlatButton
                label="Закрыть"
                primary={true}
                onClick={this.props.onRequestClose}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Утверждение работы"
                    actions={actions}
                    open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
                >
                    <TextField
                        value={mark}
                        errorText={error}
                        onChange={(e, mark) => this.setState({ mark })}
                        floatingLabelText="Оценка за задачу"
                    />
                </Dialog>
            </div>
        );
    }

    validate() {
        let validated = true;
        let error = '';

        if (this.state.mark.length == 0) {
            error = 'Оценка обязательна';
            validated = false;
        } else {
            let mark = parseFloat(this.state.mark).toFixed(2);

            if (isNaN(mark)) {
                error = 'Неправильный формат оценки. Введите десятичное число';
                validated = false;
            } else if (mark < 0) {
                error = 'Оценка не может быть меньше нуля';
                validated = false;
            }

            if (validated) {
                this.props.onAccept(mark);
            }
        }

        this.setState({
            error
        });
    }
}