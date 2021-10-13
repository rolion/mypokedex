import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Banner from "../components/Banner";
import Home from "../containers/Home";
import Pokemon from "../containers/Pokemon";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer, {initialState} from '../reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Note: this API requires redux@>=3.1.0
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const App = (props)=>{
    return (
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
        </Provider>
    )
}
export default App;
