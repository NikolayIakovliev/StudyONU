import * as React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { darkBlack, green500, red500 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { StudentApproveDialog } from './StudentApproveDialog';

export class StudentItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            approving: false,
            disapproving: false
        }
    }

    render() {
        const item = this.props.item;

        const {
            id,
            firstName,
            lastName,
            patronymic,
            photoPath,
            email,
            courseNumber,
            specialityName
        } = item;

        const {
            approving,
            disapproving
        } = this.state;

        const iconButtonElement = (
            <IconButton touch={true}>
                <MoreVertIcon />
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem style={{ color: green500 }} leftIcon={<ActionDone color={green500} />} onClick={() => this.setState({ approving: true })}>Утвердить</MenuItem>
                <MenuItem style={{ color: red500 }} leftIcon={<ContentClear color={red500} />} onClick={() => this.setState({ disapproving: true })}>Отклонить</MenuItem>
            </IconMenu>
        );

        const actions = [
            <FlatButton
                label="Подтвердить"
                primary={true}
                onClick={() => this.props.onDisapprove(id)}
            />,
            <FlatButton
                label="Отменить"
                primary={true}
                onClick={() => this.setState({ disapproving: false })}
            />
        ];

        return (
            <div>
                <StudentApproveDialog
                    studentId={id}
                    open={approving}
                    getCourses={this.props.getCourses}
                    onRequestClose={() => this.setState({ approving: false })}
                    onApprove={courseIds => this.props.onApprove(id, courseIds)}
                />
                <Dialog
                    actions={actions}
                    open={disapproving}
                    onRequestClose={() => this.setState({ disapproving: false })}>
                    Отклонить заявку?
                </Dialog>
                <ListItem
                    leftAvatar={<Avatar src={photoPath} />}
                    rightIconButton={rightIconMenu}
                    primaryText={`${lastName} ${firstName} ${patronymic}`}
                    secondaryTextLines={2}
                    secondaryText={
                        <p>
                            <span style={{ color: darkBlack }}>{email}</span><br />
                            {`${specialityName}, ${courseNumber} курс`}
                        </p>
                    } />
            </div>
        );
    }
}
