import * as React from 'react';

export class SpecialityForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            invalidForm: true
        }
    }

    render() {
        return (
            <form>
                <div>
                    <label>Название</label>
                    <input type="text" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value }, () => this.validateForm())} />
                </div>
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.sendForm(); }} disabled={this.state.invalidForm}>Создать</button>
                </div>
            </form>
        );
    }

    validateForm() {
        const { name } = this.state;

        let valid = true;

        if (name.length < 1 || name.length > 20) {
            valid = false;
        }

        this.setState({
            invalidForm: !valid
        });
    }

    sendForm() {
        this.props.createItem(this.state.name);
    }
}