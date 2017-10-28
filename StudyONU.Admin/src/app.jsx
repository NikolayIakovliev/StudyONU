import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Authentication } from './components/shared/Authentication';

import { Routes } from './Routes';
let AuthenticationComponent = withRouter(Authentication(Routes));

let root = document.getElementById('root');
render(<BrowserRouter><AuthenticationComponent /></BrowserRouter>, root);