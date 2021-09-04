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

ReactDOM.render(
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

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
