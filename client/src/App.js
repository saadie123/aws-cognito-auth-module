import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Navbar />
                    <div className="container">
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;