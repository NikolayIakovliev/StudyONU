import * as React from 'react';
import { urls } from '../../../shared/api';
import { toDate } from '../../../shared/date';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { ListFormLayoutWrapper } from '../../shared/ListFormLayoutWrapper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { GuideItem } from './GuideItem';
import { GuideForm } from './GuideForm';

export class GuideList extends React.Component {
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
        
        const list = (
            items.length &&
            <Paper zDepth={3} className="flex-grow-1">
                <List>
                    <Subheader>Методички</Subheader>
                    <Divider />
                    {items.map((item, index) => {
                        return <GuideItem
                            key={item.id}
                            item={item}
                            onEdit={item => this.setState({ itemEditRequest: item })}
                            onDelete={item => this.setState({ itemDeleteRequest: item })} />
                    })}
                </List>
            </Paper>
        );
        const form = <GuideForm createItem={data => this.modifyItem(this.props.postFormData, data)} getCourses={callback => this.getCourses(callback)} />;
        const Layout = ListFormLayoutWrapper(list, form);

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length) {
            render = <div>Возникла ошибка!</div>;
        } else {
            render = (
                <div>
                    <Layout />
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