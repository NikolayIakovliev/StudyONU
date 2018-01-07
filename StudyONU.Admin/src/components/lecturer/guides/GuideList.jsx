import * as React from 'react';
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

import Urls from '../../../shared/urls';
import DateHelper from '../../../shared/date';

export class GuideList extends React.Component {
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
                    <EmptyContent title="Методичек нет" message="Ещё не создано ни одной методички" />
                    <GuideForm createItem={data => this.modifyItem(this.props.postFormData, data)} getCourses={callback => this.getCourses(callback)} />
                </div>
            );
        }

        return (
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
            </div>
        );
    }

    getCourses(callback) {
        this.props.get(Urls.courses, data => callback(data));
    }

    modifyItem(method, data) {
        method(Urls.guides, data, () => this.load());
    }

    load() {
        this.props.get(Urls.courses, data => this.setState({
            sortCourses: data
        }));

        let self = this;
        this.props.get(Urls.guides, data => {
            const items = data.map(item => {
                if (item.dateAvailable) {
                    item.dateAvailable = DateHelper.toDate(item.dateAvailable, '.');
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