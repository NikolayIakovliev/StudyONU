import * as React from 'react';
import { urls } from '../../../shared/api';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { CourseItem } from './CourseItem';
import { CourseForm } from './CourseForm';
import { CourseEditDialog } from './CourseEditDialog';

export class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            errors: [],
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
            errors,
            itemEditRequest,
            itemDeleteRequest
        } = this.state;

        let render;

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length) {
            render = <div>Возникла ошибка!</div>;
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
                    <div className="list-form-container">
                        {items.length &&
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
                        }
                        <CourseForm createItem={data => this.modifyItem(this.props.post, data)} getSpecialities={callback => this.getSpecialities(callback)} />
                    </div>
                </div>
            );
        }

        return render;
    }

    getSpecialities(callback) {
        this.props.get(urls.specialities, result => {
            if (result.success === true) {
                callback(result.data);
            } else {
                // TODO
                // implement error display
                alert('Error');
            }
        });
    }

    modifyItem(method, data) {
        let reload = () => this.load();
        method(urls.courses, data, result => {
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
            let newState = {
                loaded: true,
                itemEditRequest: null,
                itemDeleteRequest: null,
                errors: result.errors,
                items: result.success === true
                    ? result.data
                    : []
            }

            if (result.success != true) {
                // TODO
                // implement error display
                console.log(result);
            }

            self.setState(newState);
        });
    }
}