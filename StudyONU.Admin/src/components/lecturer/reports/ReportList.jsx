import * as React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { blueA200 } from 'material-ui/styles/colors';

export class ReportList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            items
        } = this.props;

        return (
            <Paper zDepth={3}>
                <List>
                    <Subheader>Отчёты</Subheader>
                    <Divider />
                    {items.map(item => <ListItem
                        key={`${item.taskId}-${item.studentId}`}
                        leftAvatar={<Avatar src={item.studentPhoto} />}
                        primaryText={`${item.taskTitle}, ${item.courseName} (${item.courseNumber} курс)`}
                        secondaryText={`${item.studentFullName} - ${item.studentEmail}`}
                        rightIconButton={this.props.rightIconButton(item)}
                        onClick={() => this.props.onSelect(item)}
                        initiallyOpen={true}
                        nestedItems={item.filePaths.map((filePath, index) => <ListItem
                            key={filePath}
                            primaryText={`Файл ${index + 1}`}
                            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blueA200} />}
                            onClick={() => this.props.openFile(filePath)}
                        />)}
                    />)}
                </List>
            </Paper>
        );
    }
}