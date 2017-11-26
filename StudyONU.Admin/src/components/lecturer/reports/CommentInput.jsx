import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class CommentInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            error: ''
        }
    }

    render() {
        const {
            text,
            error
        } = this.state;

        return (
            <div style={{ padding: '0 16px' }}>
                <TextField
                    value={text}
                    errorText={error}
                    hintText="Добавьте Ваш комментарий"
                    fullWidth={true}
                    multiLine={true}
                    onChange={(e, text) => this.setState({ text })}
                />
                <div style={{ textAlign: 'right' }}>
                    <RaisedButton
                        label="Отправить"
                        primary={true}
                        style={{ margin: '15px 0' }}
                        onClick={() => this.validate()}
                    />
                </div>
            </div>
        );
    }

    validate() {
        let validated = true;

        let text = this.state.text.trim();
        let error = '';

        if (text.length == 0) {
            error = 'Введите комментарий';
            validated = false;
        }

        if (validated) {
            this.props.onSubmit(text);
            text = '';
        }

        this.setState({
            text,
            error
        });
    }
}