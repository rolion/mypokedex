import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from "./containers/Home";
import Pokemon from './containers/Pokemon';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Banner from "./components/Banner";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer, {initialState} from './reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Note: this API requires redux@>=3.1.0
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.hydrate(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <div className='container-fluid'>
                    <Banner name="Oscar" />
                    <Switch>
                        <Route path='/pokedex'>
                            <Home />
                        </Route>
                        <Route path='/pokemon/:name'>
                            <Pokemon />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>

                </div>
            </Router>

        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
