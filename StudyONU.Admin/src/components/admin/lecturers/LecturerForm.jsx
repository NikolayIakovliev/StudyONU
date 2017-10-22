﻿import * as React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export class LecturerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastName: '',
            firstName: '',
            patronymic: '',
            email: '',
            photo: '/images/lecturer.png',
            uploadedFile: false
        }
    }

    render() {
        const { photo } = this.state;

        let dropzoneContent;
        if (typeof photo === 'string') {
            dropzoneContent = (
                <div>
                    <p>Выберите фотографию</p>
                    <p>Допустимые расширения: .jpg, .png, .gif, .jpeg</p>
                </div>
            );
        } else {
            dropzoneContent = (
                <div>
                    <p>Загруженный файл:</p>
                    <p>{photo.name}</p>
                </div>
            );
        }

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
                    image={photo}
                    width={100}
                    height={100}
                    border={1}
                    borderRadius={100}
                    color={[0, 0, 0, 1]}
                />
                <div>
                    <Dropzone multiple={false} onDrop={files => this.setState({ photo: files[0], uploadedFile: true })} accept=".jpg,.png,.gif,.jpeg">
                        {dropzoneContent}
                    </Dropzone>
                </div>
                <div>
                    <button type="submit" onClick={e => { e.preventDefault(); this.sendForm(); }}>Создать</button>
                </div>
            </form>
        );
    }

    sendForm() {
        let validated = this.validateForm();
        if (validated) {
            const data = {
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                patronymic: this.state.patronymic,
                email: this.state.email,
                photo: this.state.photo
            }

            this.props.createItem(data);
        } else {
            // TODO
            // temp implementation
            console.log('Invalid form');
        }
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

        return valid;
    }
}