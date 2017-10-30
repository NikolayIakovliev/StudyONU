import * as React from 'react';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

export class CourseEditDialog extends React.Component {
    constructor(props) {
        super(props);

        const {
            id,
            name,
            courseNumber,
            isPublished,
            specialityId
        } = this.props.item;

        this.state = {
            id: id,
            name: name,
            courseNumber: courseNumber,
            isPublished: isPublished,
            specialityId: specialityId,
            errors: {
                name: ''
            }
        }
    }

    render() {
        const {
            id,
            name,
            courseNumber,
            isPublished,
            errors
        } = this.state;

        const courses = [1, 2, 3, 4, 5, 6];

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
                    floatingLabelText="Название курса"
                    errorText={errors.name}
                    onChange={(e, value) => this.setState({ name: value })}
                    value={name}
                /><br /><br />
                <SelectField
                    floatingLabelText="Курс"
                    value={courseNumber}
                    onChange={(event, index, value) => this.setState({ courseNumber: value })}>
                    {courses.map(item => {
                        return <MenuItem key={item} value={item} primaryText={`${item} курс`} />;
                    })}
                </SelectField><br /><br />
                <Checkbox
                    label="Опубликовать"
                    checked={isPublished}
                    onCheck={(e, checked) => this.setState({ isPublished: checked })}
                />
            </MaterialDialog>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const data = {
                id: this.state.id,
                name: this.state.name,
                courseNumber: this.state.courseNumber,
                isPublished: this.state.isPublished,
                specialityId: this.state.specialityId
            };

            this.props.onSubmit(data);
        }
    }

    validateForm() {
        const {
            name
        } = this.state;
        let errors = {
            name: ''
        }

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
            errors.name = 'От 1 до 100 символов';
        }

        this.setState({ errors: errors });
        return valid;
    }
}