import * as React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Urls from '../../../shared/urls';

export default class Feedback extends React.Component {
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
            <Paper zDepth={3} style={{ padding: 30 }}>
                <p style={{ fontSize: 18 }}><i>Вы можете помочь сайту стать лучше</i></p>
                <p>
                    Данный сайт только недавно вышел в свет и нуждается в доработке, поэтому ему необходима помощь. Однако для того, чтобы развиваться, необходимо знать свои "слабые" места. Именно для этого и была создана данная секция - с целью развивать и улучшать сайт, делать его более удобным и понятным для восприятия.
                </p>
                <p>
                    Если Вы заметили какую-либо <b>неисправность</b>, <b>недочёт</b> или у Вас есть <b>идеи</b>, как можно улучшить сайт, то <b>напишите</b> об этом на почту разработчика, который по мере своих сил учтёт все пожелания.
                </p>
                <p>
                    Все отправленные письма являются анонимными и не сохраняются на сервере, однако при желании можно указать свои данные.
                </p>
                <TextField
                    hintText="Я хочу, чтобы..."
                    multiLine={true}
                    fullWidth={true}
                    rows={1}
                    rowsMax={20}
                    value={text}
                    errorText={error}
                    onChange={(e, text) => this.setState({ text })}
                />
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RaisedButton
                        label="Помочь в развитии сайта!"
                        primary={true}
                        onClick={() => this.sendFeedback()}
                    />
                </div>
            </Paper>
        );
    }

    sendFeedback() {
        const validation = this.validate();

        if (validation.success) {
            let self = this;
            this.props.post(Urls.feedbacks, this.state.text, () => self.setState({ text: 'Спасибо!' }));
        }

        this.setState({ error: validation.error });
    }

    validate() {
        let validation = {
            success: true,
            error: ''
        }

        if (this.state.text.length == 0) {
            validation.success = false;
            validation.error = 'Вы, наверное, забыли написать свои пожелания';
        }

        return validation;
    }
}