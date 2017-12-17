import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Routes from './Routes';
let Route = withRouter(Routes);

let root = document.getElementById('root');
render(<BrowserRouter><Route /></BrowserRouter>, root);