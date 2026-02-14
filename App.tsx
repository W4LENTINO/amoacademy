import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

const App = () => {
    return (
        <div className='layout-wrapper'>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;