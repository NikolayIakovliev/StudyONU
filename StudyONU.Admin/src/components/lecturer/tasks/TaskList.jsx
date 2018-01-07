import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Filter } from '../../shared/filter/Filter';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { EmptyContent } from '../../shared/EmptyContent';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { TaskEditDialog } from './TaskEditDialog';

import Urls from '../../../shared/urls';
import DateHelper from '../../../shared/date';

export class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            itemEditRequest: null,
            itemDeleteRequest: null,
            sortCourses: [],
            sortCourseId: null
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            loaded,
            items,
            errors,
            itemEditRequest,
            itemDeleteRequest,
            sortCourses,
            sortCourseId
        } = this.state;

        const courses = sortCourses.map(course => { return { id: course.id, label: course.name } });
        const sortedItems = items.filter(item => sortCourseId == null || item.courseId == sortCourseId);

        if (!loaded) {
            return <Loading />;
        }

        if (items.length == 0) {
            return (
                <div>
                    <EmptyContent title="Задач нет" message="Ещё не создано ни одной задачи" />
                    <TaskForm getCourses={callback => this.getCourses(callback)} createItem={data => this.modifyItem(this.props.postFormData, data)} />
                </div>
            );
        }

        return (
            <div>
                <Filter
                    value={sortCourseId}
                    items={courses}
                    defaultText="Все задачи"
                    onChange={sortCourseId => this.setState({ sortCourseId })}
                />
                {itemEditRequest != null &&
                    <TaskEditDialog
                        title="Редактирование задачи"
                        open={true}
                        item={itemEditRequest}
                        onClose={() => this.setState({ itemEditRequest: null })}
                        onSubmit={(item, updateFiles) => {
                            const data = {
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                dateAvailable: item.dateAvailable,
                                dateOverdue: item.dateOverdue,
                            };
                            this.modifyItem(this.props.put, data);
                            if (updateFiles) {
                                const filesData = {
                                    id: item.id,
                                    files: item.files
                                };
                                this.modifyItem(this.props.putFormData, filesData, Urls.tasks.files);
                            }
                        }} />
                }
                {itemDeleteRequest != null &&
                    <Dialog
                        title="Подтвердите действие"
                        message="Вы уверены, что хотите удалить задачу? Данное действие необратимо"
                        open={true}
                        actionLabel="Удалить"
                        onClose={() => this.setState({ itemDeleteRequest: null })}
                        onSubmit={() => this.modifyItem(this.props.delete, itemDeleteRequest)} />
                }
                <div className="list-form-container">
                    <Paper zDepth={3} className="flex-grow-1">
                        <List>
                            <Subheader>Задачи</Subheader>
                            <Divider />
                            {sortedItems.map((item, index) => {
                                return <TaskItem
                                    key={item.id}
                                    item={item}
                                    onEdit={item => this.setState({ itemEditRequest: item })}
                                    onDelete={item => this.setState({ itemDeleteRequest: item })} />
                            })}
                        </List>
                    </Paper>
                    <TaskForm getCourses={callback => this.getCourses(callback)} createItem={data => this.modifyItem(this.props.postFormData, data)} />
                </div>
            </div>
        );;
    }

    getCourses(callback) {
        this.props.get(Urls.courses, data => callback(data));
    }

    modifyItem(method, data, url = Urls.tasks.common) {
        method(url, data, () => this.load());
    }

    load() {
        this.props.get(Urls.courses, data => this.setState({
            sortCourses: data
        }));

        let self = this;
        this.props.get(Urls.tasks.common, data => {
            const items = data.map(item => {
                if (item.dateAvailable) {
                    item.dateAvailable = DateHelper.toDate(item.dateAvailable, '.');
                }
                if (item.dateOverdue) {
                    item.dateOverdue = DateHelper.toDate(item.dateOverdue, '.');
                }

                return item;
            });

            self.setState({
                loaded: true,
                itemEditRequest: null,
                itemDeleteRequest: null,
                items: items
            });
        });
    }
}