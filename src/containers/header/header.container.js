import React, { Component } from 'react';
import '../../main.css';

class Header extends Component {

    logOutuser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.props.history.push("/");
    };

    getUsername = () =>{
        let username = localStorage.getItem("username");
        console.log('username', username);
        return <div className="username-header">{username}</div>;
    }

    goToHome = () =>{
        this.props.history.push("/");
    }

    render() {
        return (
        <div className="App">
        <div className="nav-header">
        <div className="comp-name" onClick={this.goToHome}>Decoder</div>
        {this.getUsername()}
        {localStorage.getItem("username") && <div className="logout-button" onClick={this.logOutuser}>Logout</div>}
        </div>
        </div>
        );
    }
}

export default Header;
