import * as React from "react";
import {render} from 'react-dom';
import {BrowserRouter} from "react-router-dom";
// import { Provider } from 'react-redux';
// import store from './Store/store';

import App from './Components/App';


render(
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>,
    document.getElementById('root'));