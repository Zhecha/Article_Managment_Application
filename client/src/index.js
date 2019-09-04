import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import {configureStore} from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
