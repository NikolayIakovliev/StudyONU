import * as React from 'react';
import { Link } from 'react-router-dom'

import './notFound.scss';

export class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found-wrapper">
                <div className="title-wrapper">
                    <h1>Страница не найдена!</h1>
                </div>
                <div className="not-found-face-container">
                    <img src="/images/not-found.png" className="not-found-face" />
                </div>
                <p className="not-found-text">
                    Возможно, Вы захотите перейти на <Link to="/">Главную страницу</Link>
                </p>
            </div>
        );
    }
}
