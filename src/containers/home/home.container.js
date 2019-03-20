import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCallApi } from '../../utils/utils';
import {  API_URL } from '../../constants/index';
import '../../assets/css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loginFormOpen: true
    }
  }

  componentDidMount = () =>{
    const token = localStorage.getItem("token");
    if(token){
      this.props.history.push({
        pathname: '/threads',
    });
    }
    
  }

  validateForm=()=> {
    var fields = ["Name", "Phone", "Email", "Message", "Captcha"];
    var i, l = fields.length;
    var fieldname;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["contact-us-form"][fieldname].value === "") {
            alert(fieldname + " field can not be empty");
            return false;
        }
    }
    return true;
}

  registerUser = (e) =>{
    e.preventDefault();
    var email = document.getElementById("remail").value;
    var password = document.getElementById("rpassword").value;
    var passwordCheck = document.getElementById("checkPassword").value;
    if(passwordCheck !== password){
      alert("Passwords doesn't match");
      return;
    }

    postCallApi(`${API_URL}/users/register`, {
      email: email,
      password: password
  }).then((data) => {
      if (data) {
        console.log('loginData',data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.user._id);
        this.props.history.push({
          pathname: '/threads',
      });
          // document.getElementById("myForm").reset();        
      } else {
          // currentComponent.refs.formMessage.innerHTML = "Please try again";
      }
  })
  .catch((error) => {
    alert("Error", error);
  });
  }

  loginUser = (e) =>{
    let currentComponent = this;
    e.preventDefault();
    var email = document.getElementById("lemail").value;
    var password = document.getElementById("lpassword").value;
    postCallApi(`${API_URL}/users/login`, {
      email: email,
      password: password
  }).then((data) => {
      if (data && data.data) {
              console.log('loginData',data);
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("username", data.data.user._id);
              this.props.history.push({
                pathname: '/threads',
            });
          // document.getElementById("myForm").reset();          
      } else {
        currentComponent.refs.wrongpassword.innerHTML = "Check Password";
        setTimeout(() => {
          currentComponent.refs.wrongpassword.innerHTML = "";
            }, 1500
        );
        // alert(data.message);
      }
  })
  .catch((error) => {
    console.log("Check password", error);
  });
  }

  togglePopup = () => {
    this.setState({
      loginFormOpen : !this.state.loginFormOpen
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loginFormOpen && <div className="login">
        <div className="container" style={{margin:'auto'}}>
          <h1>Decoder.</h1>
          
          <form id="rForm" name="contact-us-form" onSubmit={(e)=>this.loginUser(e)}>
            <input type="email" required id="lemail" placeholder="Email"/>
            <input type="password" required id="lpassword" placeholder="Password"/>
            <p ref='wrongpassword' style={{ fontFamily: "Lato",color: "#2a0ad0",fontSize: "15px",marginTop:8, fontWeight:600, textAlign:"center" }}></p>
            <input type="submit" value="Sign In"/>
            <p>Don't have an account? <span onClick = {this.togglePopup}>Register Now</span></p>
          </form>
        </div>
        </div>}
        {!this.state.loginFormOpen && <div className="login">
        <div className="container" style={{margin:'auto'}}>
        <h1>Decoder.</h1>
          
          <form id="lForm" name="contact-us-form" onSubmit={(e)=>this.registerUser(e)}>
            <input type="email" id="remail" required placeholder="Email"/>
            <input type="password" id="rpassword" required placeholder="Password"/>
            <input type="password" id="checkPassword" required placeholder="Repeat Password"/>
            <input type="submit" value="Sign Up"/>
            <p>Already have an account? <span onClick = {this.togglePopup}>Login Now</span></p>
          </form>
        </div>
        </div>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: dispatch
  }
};

export default connect(state => state, mapDispatchToProps)(Home);

