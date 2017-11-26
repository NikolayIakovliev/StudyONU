import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import { DateHelper } from '../../shared/date';

import './commentList.scss';

export class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            items
        } = this.props;

        return (
            <List className="comment-list">
                <Subheader>Комментарии</Subheader>
                <Divider />
                {items.map((item, index) => <ListItem
                    key={index}
                    leftAvatar={<Avatar src={item.senderPhoto} />}
                    innerDivStyle={{ borderBottom: '1px solid gainsboro' }}
                >
                    <div className="comment-item">
                        <p className="sender-name">{item.senderFullName}</p>
                        <p className="sender-email">{item.senderEmail}</p>
                        <p className="comment-text" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                        <p className="comment-date">{DateHelper.ddmmyyyy(item.dateCreated, '.')}</p>
                    </div>
                </ListItem >)}
            </List>
        );
    }
}