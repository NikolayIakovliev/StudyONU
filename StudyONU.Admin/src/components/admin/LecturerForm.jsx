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
            fileName: '/images/lecturer.png',
            file: null
        }
    }

    render() {
        let _this = this;

        return (
            <form>
                <div>
                    <label>Фамилия</label>
                    <input type="text" name="lastName" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                </div>
                <div>
                    <label>Имя</label>
                    <input type="text" name="firstName" value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                </div>
                <div>
                    <label>Отчество</label>
                    <input type="text" name="patronymic" value={this.state.patronymic} onChange={e => this.setState({ patronymic: e.target.value })} />
                </div>
                <div>
                    <label>Почта</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                </div>
                <AvatarEditor
                    image={this.state.fileName}
                    width={100}
                    height={100}
                    border={1}
                    borderRadius={100}
                    color={[0, 0, 0, 1]}
                />
                <div>
                    <FileInput name="myImage"
                        accept=".jpg,.png,.gif"
                        placeholder="Choose avatar"
                        className="inputClass"
                        onChange={e => this.handleFileUpload(e, _this)} />
                </div>
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.props.post(this.state); }}>Создать</button>
                </div>
            </form>
        );
    }

    handleFileUpload(e, _this) {
        _this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }
}