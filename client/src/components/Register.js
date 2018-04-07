import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


class Register extends Component {

    state = {
        registerForm:{
            name: '',
            email: '',
            username: '',
            password: ''
        },
        successCode:'',
        message: ''
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
        axios.post('/auth/register',this.state.registerForm).then(response=>{
            this.setState({successCode: response.status, message: response.data.message});
        }).catch(error=>{
            console.log(error.response);
        })
    }

    render(){
        let redirect = null;
        if(this.state.successCode == 201 ){
            redirect = <Redirect to='/confirm' />
        }
        return(
            <div className="row">
            {redirect}
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
                            <div>Password must have:</div>
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