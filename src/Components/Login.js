import React from 'react';
import {connect} from "react-redux";
import "../Styles/Login.css";
import CircleYoutubeIcon from '../Icons/Login/circle_youtube.png';
import axios from 'axios';
import {LoginAction} from '../Actions/MainActions';



class Login extends React.Component{
    
    state = {
        username: '',
        password: '',
    }

    setInputsToState = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    loginAction = (e) => {
        e.preventDefault();
        let params = {
            username: this.state.username,
            password: this.state.password,
        }
        axios.post("http://127.0.0.1:8000/login", params)
        .then((res) => {
            this.props.login(res.data);
            this.props.history.goBack();
        });
    }

    render(){
        return(
            <form id="LoginForm">
                <img src={CircleYoutubeIcon} id="CircleYoutubeIcon"/>

                <div>
                    <label id='usernameLabel'>Username:</label>
                    <input type="text" id="username" placeholder="Username" onChange={this.setInputsToState}/>
                </div>

                <div>
                    <label id="passwordLabel">Password:</label>
                    <input type="password" id="password" placeholder="Password" onChange={this.setInputsToState}/>
                </div>

                <button id="loginButton" onClick={this.loginAction}>Login</button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return{

    };
}

function mapDispatchToProps(dispatch){
    return{
        login: (data) => dispatch(LoginAction(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);