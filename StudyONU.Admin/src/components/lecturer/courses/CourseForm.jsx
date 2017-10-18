import * as React from 'react';
import { urls } from '../../../shared/api';
import Dropdown from 'react-dropdown';
import NumericInput from 'react-numeric-input';

export class CourseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            courseNumber: 1,
            speciality: null,
            isPublished: false,
            specialities: []
        }
    }

    componentWillMount() {
        this.load();
    }

    load() {
        let _this = this;
        this.props.getSpecialities(specialities => {
            _this.setState({
                specialities: specialities
            });
        });
    }

    render() {
        let options = this.state.specialities.map(speciality => {
            return {
                value: speciality.id,
                label: speciality.name
            };
        });

        return (
            <form>
                <div>
                    <label>Название</label>
                    <input type="text" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                </div>
                <div>
                    <label>Номер курса</label>
                    <NumericInput min={1} max={6} value={1} value={this.state.courseNumber} onChange={value => this.setState({ courseNumber: value })} />
                </div>
                <div>
                    <Dropdown options={options} onChange={option => this.setState({ speciality: option })} value={this.state.speciality} placeholder="Выберите специальность" />
                </div>
                <div>
                    <label>Виден всем</label>
                    <input type="checkbox" name="isPublished" value={this.state.isPublished} onChange={() => this.setState({ isPublished: !this.state.isPublished })} />
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
                name: this.state.name,
                courseNumber: this.state.courseNumber,
                specialityId: this.state.speciality.value,
                isPublished: this.state.isPublished
            };

            this.props.createItem(data);
        }
    }

    validateForm() {
        const { name, courseNumber, speciality, isPublished } = this.state;

        let valid = true;

        if (name.length < 1 || name.length > 100) {
            valid = false;
        } else if (courseNumber < 1 || courseNumber > 6) {
            valid = false;
        } else if (!speciality) {
            valid = false;
        }

        return valid;
    }
}