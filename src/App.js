import React, {Component} from 'react';
import {HashRouter as Router} from "react-router-dom";
import {main as mainConfig} from './router/index'
import {RenderRoutes} from './router/utils'
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <RenderRoutes routes={mainConfig}></RenderRoutes>
            </Router>
        );
    }
}

export default App;
