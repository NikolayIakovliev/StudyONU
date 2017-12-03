import * as React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import { blue500 } from 'material-ui/styles/colors';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { urls } from '../../shared/api';
import { Downloader } from '../../shared/download';

import { Header } from '../shared/Header';

import { RightIconButton } from './RightIconButton';

export class GuideList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            items,
            loaded
        } = this.state;

        // TODO
        // Replace by Loading
        if (!loaded) {
            return null;
        }

        const navigationLinks = this.getNavigationLinks();

        return (
            <div>
                <Header navigationLinks={navigationLinks} backLink={this.props.user.isLoggedIn ? '/courses/my' : '/courses/public'} {...this.props} />
                <Paper zDepth={3}>
                    <List>
                        <Subheader>Методички</Subheader>
                        <Divider />
                        {items.map((item, index) => <ListItem
                            key={index}
                            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                            primaryText={item.name}
                            rightIconButton={RightIconButton(() => Downloader.guide(item.filePath, item.name))}
                        />)}
                    </List>
                </Paper>
            </div>
        );
    }

    getNavigationLinks() {
        const id = this.props.match.params.id;
        let navLinks = [
            { to: `/courses/${id}/tasks`, title: 'Задачи' },
            { to: `/courses/${id}/guides`, title: 'Методички' }
        ];

        if (this.props.user.isLoggedIn) {
            navLinks.push({ to: `/courses/${id}/progress`, title: 'Успеваемость' });
        }

        return navLinks;
    }


    load() {
        let self = this;
        const courseId = this.props.match.params.id;

        this.props.get(urls.guides(courseId), result => {
            self.setState({
                items: result.data,
                loaded: true
            });
        });
    }
}