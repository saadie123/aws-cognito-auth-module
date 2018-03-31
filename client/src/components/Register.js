import React, { Component } from 'react';

class Register extends Component {

    state = {
        registerForm:{
            name: '',
            email: '',
            username: '',
            password: ''
        }
    }

    inputChangeHandler = (e, inputName) => {
        let updatedRegisterForm = {
            ...this.state.registerForm
        }
        updatedRegisterForm[inputName] = e.target.value;
        this.setState({registerForm: updatedRegisterForm});
    }
    onRegister = (e) => {
        e.preventDefault();
        console.log(this.state.registerForm);
    }

    render(){
        return(
            <div className="row">
                    <div className="col-md-6">
                    <h1 className="page-header">Register</h1>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" onChange={(event) => this.inputChangeHandler(event,'name')} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={(event) => this.inputChangeHandler(event,'email')} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" onChange={(event) => this.inputChangeHandler(event,'username')} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" onChange={(event) => this.inputChangeHandler(event,'password')} className="form-control"/>
                            </div>
                            <div>Password must have atleast:</div>
                            <ul>
                                <li>one uppercase letter</li>
                                <li>one lowercase letter</li>
                                <li>one number</li>
                                <li>one special character</li>                                                                
                            </ul>
                            <button onClick={(event) => this.onRegister(event)} className="btn btn-primary" type="submit">Register</button>
                        </form>
                    </div>
            </div>
        )
    }
}

export default Register;