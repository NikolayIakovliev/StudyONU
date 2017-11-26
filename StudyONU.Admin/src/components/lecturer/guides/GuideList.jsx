import * as React from 'react';
import { urls } from '../../../shared/api';
import { toDate } from '../../../shared/date';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { Filter } from '../../shared/filter/Filter';
import { EmptyContent } from '../../shared/EmptyContent';
import { GuideItem } from './GuideItem';
import { GuideForm } from './GuideForm';
import { GuideEditDialog } from './GuideEditDialog';

export class GuideList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            errors: [],
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

        let render;

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length) {
            render = <div>Возникла ошибка!</div>;
        } else {
            render = (
                <div>
                    <Filter
                        value={sortCourseId}
                        items={courses}
                        defaultText="Все методички"
                        onChange={sortCourseId => this.setState({ sortCourseId })}
                    />
                    {itemEditRequest != null &&
                        <GuideEditDialog
                            title="Редактирование методички"
                            open={true}
                            item={itemEditRequest}
                            onClose={() => this.setState({ itemEditRequest: null })}
                            onSubmit={item => this.modifyItem(this.props.putFormData, item)} />
                    }
                    {itemDeleteRequest != null &&
                        <Dialog
                            title="Подтвердите действие"
                            message="Вы уверены, что хотите удалить методичку? Данное действие необратимо"
                            open={true}
                            actionLabel="Удалить"
                            onClose={() => this.setState({ itemDeleteRequest: null })}
                            onSubmit={() => this.modifyItem(this.props.delete, itemDeleteRequest)} />
                    }
                    {items.length == 0 &&
                        <div>
                            <EmptyContent title="Методичек нет" message="Ещё не создано ни одной методички" />
                            <GuideForm createItem={data => this.modifyItem(this.props.postFormData, data)} getCourses={callback => this.getCourses(callback)} />
                        </div>
                    }
                    {items.length > 0 &&
                        <div className="list-form-container">
                            <Paper zDepth={3} className="flex-grow-1">
                                <List>
                                    <Subheader>Методички</Subheader>
                                    <Divider />
                                    {sortedItems.map((item, index) => {
                                        return <GuideItem
                                            key={item.id}
                                            item={item}
                                            onEdit={item => this.setState({ itemEditRequest: item })}
                                            onDelete={item => this.setState({ itemDeleteRequest: item })} />
                                    })}
                                </List>
                            </Paper>
                            <GuideForm createItem={data => this.modifyItem(this.props.postFormData, data)} getCourses={callback => this.getCourses(callback)} />
                        </div>
                    }
                </div>
            );
        }

        return render;
    }

    getCourses(callback) {
        this.props.get(urls.courses, result => {
            if (result.success === true) {
                callback(result.data);
            } else {
                // TODO
                // implement error display
                alert('Error');
                console.log(result);
            }
        });
    }

    modifyItem(method, data) {
        let reload = () => this.load();
        method(urls.guides, data, result => {
            if (result.success === true) {
                reload();
            } else {
                // TODO
                // implement error display
                alert('Error');
                console.log(result);
            }
        });
    }

    load() {
        let self = this;

        this.props.get(urls.courses, result => {
            self.setState({
                sortCourses: result.data
            });
        });

        this.props.get(urls.guides, result => {
            let newState = {
                loaded: true,
                itemEditRequest: null,
                itemDeleteRequest: null,
                errors: result.errors,
                items: result.success === true
                    ? result.data
                    : []
            }

            newState.items = newState.items.map(item => {
                if (item.dateAvailable) {
                    item.dateAvailable = toDate(item.dateAvailable, '.');
                }

                return item;
            });

            if (result.success != true) {
                // TODO
                // implement error display
                console.log(result);
            }

            self.setState(newState);
        });
    }
}