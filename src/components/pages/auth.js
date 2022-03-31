import React, { Component } from 'react';
import Login from "../auth/login.js";
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(){
        this.props.handleSuccessfulLogin();
        this.props.history.push("/"); //redirect to home page
    }

    handleUnsuccessfulAuth(){
        this.props.handleUnsuccessfulLogin();
    }

    render() {
        return (
            <div className="auth-page-wrapper">
                <div className="left-column" 
                    style={{backgroundImage: `url(${loginImg})`
                    }}
                />


                <div className="right-column">
                    

                    {this.props.loggedInStatus === "LOGGED_IN" ? 
                    <div>
                        <h1>Welcome!</h1>
                        <h3>You are already logged in.</h3>
                    </div>
                    : 
                    <Login 
                        handleSuccessfulAuth = {this.handleSuccessfulAuth}
                        handleUnsuccessfulAuth = {this.handleUnsuccessfulAuth}
                    />
                    }
                </div>
                
            </div>
        );
    }
}