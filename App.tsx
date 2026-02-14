import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import './App.css';

const mockData = {
    title: 'Welcome to Amo Academy',
    description: 'Your one-stop solution for learning.'
};

const App = () => {
    return (
        <div className="App">
            <Router>
                <div>
                    <header>
                        <h1>{mockData.title}</h1>
                    </header>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/about' component={About} />
                        <Route path='/contact' component={Contact} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;