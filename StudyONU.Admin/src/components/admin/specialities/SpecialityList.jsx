import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { SpecialityItem } from './SpecialityItem';
import { SpecialityForm } from './SpecialityForm';
import { SpecialityEditDialog } from './SpecialityEditDialog';

import Urls from '../../../shared/urls';

export class SpecialityList extends React.Component {
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
                        <SpecialityEditDialog
                            message="Введите новое название"
                            open={true}
                            value={itemEditRequest.name}
                            onClose={() => this.setState({ itemEditRequest: null })}
                            onSubmit={(newValue) => {
                                this.state.itemEditRequest.name = newValue;
                                this.modifyItem(this.props.put, itemEditRequest);
                            }} />
                    }
                    {itemDeleteRequest != null &&
                        <Dialog
                            title="Подтвердите действие"
                            message="Вы уверены, что хотите удалить специальность? Данное действие необратимо"
                            open={true}
                            actionLabel="Удалить"
                            onClose={() => this.setState({ itemDeleteRequest: null })}
                            onSubmit={() => this.modifyItem(this.props.delete, itemDeleteRequest)} />
                    }
                    <SpecialityForm createItem={data => this.modifyItem(this.props.post, data)} />
                    {items.length &&
                        <Paper zDepth={3}>
                            <List>
                                <Subheader>Специальности</Subheader>
                                <Divider />
                                {items.map((item, index) => {
                                    return <SpecialityItem
                                        key={item.id}
                                        item={item}
                                        onEdit={item => this.setState({ itemEditRequest: item })}
                                        onDelete={item => this.setState({ itemDeleteRequest: item })} />
                                })}
                            </List>
                        </Paper>
                    }
                </div>
            );
        }

        return render;
    }

    modifyItem(method, data) {
        method(Urls.specialities, data, () => this.load());
    }

    load() {
        this.props.get(Urls.specialities, data => this.setState({
            loaded: true,
            itemEditRequest: null,
            itemDeleteRequest: null,
            items: data
        }));
    }
}