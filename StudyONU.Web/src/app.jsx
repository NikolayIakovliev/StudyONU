import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Authentication } from './pages/shared/Authentication';

import { Routes } from './Routes';
let Root = withRouter(Authentication(Routes));

let root = document.getElementById('root');
render(<BrowserRouter><Root /></BrowserRouter>, root);