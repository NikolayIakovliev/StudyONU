import * as React from 'react';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class SpecialityEditDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    render() {
        const actions = (
            <FlatButton
                label="Сохранить"
                primary={true}
                onClick={() => this.props.onSubmit(this.state.value)} />
        );

        return (
            <MaterialDialog
                title="Редактирование"
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
                <p>{this.props.message}</p>
                <TextField name="value" value={this.state.value} onChange={(e, value) => this.setState({ value: value })} />
            </MaterialDialog>
        );
    }
}