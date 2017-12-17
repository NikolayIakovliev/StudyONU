import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { EmptyContent } from '../../shared/EmptyContent';
import { CourseItem } from './CourseItem';
import { CourseForm } from './CourseForm';
import { CourseEditDialog } from './CourseEditDialog';

import Urls from '../../../shared/urls';

export class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            itemEditRequest: null,
            itemDeleteRequest: null
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
            itemDeleteRequest
        } = this.state;

        let render;

        if (!loaded) {
            render = <Loading />;
        } else {
            render = (
                <div>
                    {itemEditRequest != null &&
                        <CourseEditDialog
                            title="Редактирование курса"
                            open={true}
                            item={itemEditRequest}
                            onClose={() => this.setState({ itemEditRequest: null })}
                            onSubmit={item => this.modifyItem(this.props.put, item)} />
                    }
                    {itemDeleteRequest != null &&
                        <Dialog
                            title="Подтвердите действие"
                            message="Вы уверены, что хотите удалить курс? Данное действие необратимо"
                            open={true}
                            actionLabel="Удалить"
                            onClose={() => this.setState({ itemDeleteRequest: null })}
                            onSubmit={() => this.modifyItem(this.props.delete, itemDeleteRequest)} />
                    }
                    {items.length == 0 &&
                        <div>
                            <EmptyContent title="Курсов нет" message="Ещё не создано ни одного курса" />
                            <CourseForm createItem={data => this.modifyItem(this.props.post, data)} getSpecialities={callback => this.getSpecialities(callback)} />
                        </div>
                    }
                    {items.length > 0 &&
                        <div className="list-form-container">
                            <Paper zDepth={3} className="flex-grow-1">
                                <List>
                                    <Subheader>Курсы</Subheader>
                                    <Divider />
                                    {items.map((item, index) => {
                                        return <CourseItem
                                            key={item.id}
                                            item={item}
                                            onEdit={item => this.setState({ itemEditRequest: item })}
                                            onDelete={item => this.setState({ itemDeleteRequest: item })} />
                                    })}
                                </List>
                            </Paper>
                            <CourseForm createItem={data => this.modifyItem(this.props.post, data)} getSpecialities={callback => this.getSpecialities(callback)} />
                        </div>
                    }
                </div>
            );
        }

        return render;
    }

    getSpecialities(callback) {
        this.props.get(Urls.specialities, data => callback(data));
    }

    modifyItem(method, data) {
        method(Urls.courses, data, () => this.load());
    }

    load() {
        this.props.get(Urls.courses, data => this.setState({
            loaded: true,
            itemEditRequest: null,
            itemDeleteRequest: null,
            items: data
        }));
    }
}