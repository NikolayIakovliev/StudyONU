import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

export class StudentApproveDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: props.studentId,
            recommendedItems: []
        }
    }

    componentDidMount() {
        let self = this;

        this.props.getCourses(this.state.studentId, result => {
            self.setState({
                recommendedItems: result.data.map(course => { return { course: course, checked: true } })
            });
        });
    }

    render() {
        const {
            studentId,
            recommendedItems
        } = this.state;

        const actions = [
            <FlatButton
                label="Подтвердить"
                primary={true}
                onClick={() => {
                    const courseIds = recommendedItems.filter(item => item.checked).map(item => item.course.id);
                    this.props.onApprove(courseIds);
                }}
            />,
            <FlatButton
                label="Отмена"
                primary={true}
                onClick={() => this.props.onRequestClose()}
            />,
        ];

        return (
            <Dialog
                title="Регистрация студента"
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.props.onRequestClose()}
            >
                <List>
                    <Subheader>Рекоммендуемые курсы</Subheader>
                    <Divider />
                    {recommendedItems.map(item => {
                        const {
                            course,
                            checked
                        } = item;
                        return (
                            <ListItem
                                key={item.course.id}
                                leftCheckbox={<Checkbox checked={checked} onCheck={(e, isChecked) => this.onCheck(item, isChecked)} />}
                                primaryText={course.name}
                                secondaryText={`${course.specialityName}, ${course.courseNumber} курс`}
                            />
                        );
                    })}
                </List>
            </Dialog>
        );
    }

    onCheck(item, isChecked) {
        const items = this.state.recommendedItems.map(recommendedItem => {
            if (recommendedItem.course.id == item.course.id) {
                recommendedItem.checked = isChecked;
            }

            return recommendedItem;
        });

        this.setState({
            recommendedItems: items
        });
    }
}