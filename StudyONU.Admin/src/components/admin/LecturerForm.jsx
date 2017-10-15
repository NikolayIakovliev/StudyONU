import * as React from 'react';
import AvatarEditor from 'react-avatar-editor';
import FileInput from 'react-file-input';

export class LecturerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: '/images/lecturer.png',
            uploadedFile: false,
            invalidForm: true
        }
    }

    render() {
        return (
            <form>
                <div>
                    <label>Фамилия</label>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value }, () => this.validateForm())} />
                </div>
                <div>
                    <label>Имя</label>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value }, () => this.validateForm())} />
                </div>
                <div>
                    <label>Отчество</label>
                    <input type="text" name="patronymic" value={this.state.patronymic} onChange={e => this.setState({ patronymic: e.target.value }, () => this.validateForm())} />
                </div>
                <div>
                    <label>Почта</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value }, () => this.validateForm())} />
                </div>
                <AvatarEditor
                    image={this.state.photo}
                    width={100}
                    height={100}
                    border={1}
                    borderRadius={100}
                    color={[0, 0, 0, 1]}
                />
                <div>
                    <FileInput
                        name="photo"
                        accept=".jpg,.png,.gif"
                        placeholder="Choose avatar"
                        className="inputClass"
                        onChange={e => this.setState({ photo: e.target.files[0], uploadedFile: true }, () => this.validateForm())} />
                </div>
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.sendForm(); }} disabled={this.state.invalidForm}>Создать</button>
                </div>
            </form>
        );
    }

    validateForm() {
        const { lastName, firstName, patronymic, email, uploadedFile } = this.state;

        let valid = true;

        if (lastName.length < 1 || lastName.length > 20) {
            valid = false;
        } else if (firstName.length < 1 || firstName.length > 20) {
            valid = false;
        } else if (patronymic.length < 1 || patronymic.length > 20) {
            valid = false;
        } else if (email.length < 1 || email.length > 254) {
            valid = false;
        } else if (!uploadedFile) {
            valid = false;
        }

        this.setState({
            invalidForm: !valid
        });
    }

    sendForm() {
        let reader = new FileReader();
        reader.onloadend = (e) => {
            let data = {
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                patronymic: this.state.patronymic,
                email: this.state.email,
                photo: reader.result
            }
            
            this.props.createLecturer(data);
        }

        reader.readAsDataURL(this.state.photo);
    }
}