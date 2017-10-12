import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

let root = document.getElementById('root');
let reactRoot = (
    <BrowserRouter children={routes} />
);
render(reactRoot, root);