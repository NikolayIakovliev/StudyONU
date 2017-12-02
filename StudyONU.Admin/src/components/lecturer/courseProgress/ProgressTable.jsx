import * as React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class ProgressTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            tasks,
            students
        } = this.props;

        return (
            <Table multiSelectable={true}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn></TableHeaderColumn>
                        {tasks.map(item => <TableHeaderColumn key={item.id} className="centered">{item.title}</TableHeaderColumn>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map(item => <TableRow>
                        <TableRowColumn style={{ whiteSpace: 'normal', padding: 0 }}>{item.studentFullName}</TableRowColumn>
                        {tasks.map(task => {
                            const report = item.reports.find(report => report.taskId === task.id);
                            let content = '-';
                            if (report && report.mark) {
                                content = report.mark;
                            }

                            return <TableRowColumn className="centered">{content}</TableRowColumn>;
                        })}
                    </TableRow>)}
                </TableBody>
            </Table>
        );
    }
}