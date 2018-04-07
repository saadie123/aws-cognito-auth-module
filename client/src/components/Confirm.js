import React, { Component } from 'react';
import axios from 'axios';


class Confirm extends Component {

    state = {
        confirmForm:{
            username: '',
            code:''
        },
        message: null
    }

    inputChangeHandler = (e, inputName) => {
        let updatedConfirmForm = {
            ...this.state.confirmForm
        }
        updatedConfirmForm[inputName] = e.target.value;
        this.setState({confirmForm: updatedConfirmForm});
    }
    onConfirm = (e) => {
        e.preventDefault();
        axios.post('/auth/confirm',this.state.confirmForm).then(response=>{
            this.setState({message: response.data.message});
        }).catch(error=>{
            console.log(error.response);
        })
    }

    render(){
        let message = null;
        if(this.state.message){
            message = (
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
            )
        }
        return(
            <div className="row">
                    <div className="col-md-6">
                    <h1 className="page-header">Confirm Your account</h1>
                    <p>Please enter your username and the code you received via email!</p>
                        <form action="">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" onChange={(event) => this.inputChangeHandler(event,'username')} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="code">Code</label>
                                <input type="number" onChange={(event) => this.inputChangeHandler(event,'code')} className="form-control"/>
                            </div>
                            <button onClick={(event) => this.onConfirm(event)} className="btn btn-primary" type="submit">Confirm</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        {message}
                    </div>
            </div>
        )
    }
}

export default Confirm;