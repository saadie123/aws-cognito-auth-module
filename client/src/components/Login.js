import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    state = {
        loginForm:{
            username: '',
            password: ''
        },
        user:null,
        message: '',
        errors: null
    }

    inputChangeHandler = (e, inputName) => {
        let updatedLoginForm = {
            ...this.state.loginForm
        }
        updatedLoginForm[inputName] = e.target.value;
        this.setState({loginForm: updatedLoginForm});
    }
    onLogin = (e) => {
        e.preventDefault();
        axios.post('/auth/login',this.state.loginForm).then(response=>{
            this.setState({user:response.data.user,message: response.data.message, errors:null});
            console.log(this.state.message);
        }).catch(error=>{
            console.log(error.response);
            this.setState({user:null,message: '',errors: error.response.data.errors});
        })
    }
    render(){
        let message = null;
        if(this.state.user && this.state.message){
            message = (
                <div>
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                    <div className="alert alert-success" role="alert">
                        {"Logged in as "+this.state.user.name}
                    </div>
                </div>
            )
        }
        let errorMessage = null;
        if(this.state.errors){
            errorMessage = (
                <div className="alert alert-danger" role="alert">
                        {this.state.errors[0]}
                </div>
            )
        }
        return(
            <div className="row">
                    <div className="col-md-6">
                    <h1 className="page-header">Login</h1>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="email">Username</label>
                                <input type="email" onChange={(event) => this.inputChangeHandler(event,'username')} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={(event) => this.inputChangeHandler(event,'password')} className="form-control"/>
                            </div>
                            <button onClick={(event) => this.onLogin(event)} className="btn btn-primary" type="submit">Login</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                    <br/>
                        {errorMessage}
                        {message}
                    </div>
            </div>
        )
    }
}

export default Login;