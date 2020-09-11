import React from 'react';
import './register.css';
import { login, register } from '../autho/Repository'

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoginOpen: true, 
        isRegisterOpen: false};
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
  showLoginBox() {
    this.setState({isRegisterOpen: false, isLoginOpen: true});
  }
  render() {
      return (
          <div>
              <div className="box-controller">
                  <div className="controller" onClick={this.showLoginBox.bind(this)}>
                      Login
                  </div>
                  <div className="controller" onClick={this.showRegisterBox.bind(this)}>
                      Register
                  </div>  
              </div>
              <div className="box-controller">
                {this.state.isLoginOpen && <LoginBox handleSuccessfulAuth={this.props.handleSuccessfulAuth}/>}
                {this.state.isRegisterOpen && <RegisterBox />}
              </div>
          </div> 
      )
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
       this.state = { 
           email: '', 
           password: '',
       };
       this.handleInputChange =this.handleInputChange.bind(this);
       this.submitLogin =this.submitLogin.bind(this);
       }
   
       handleInputChange(event) {
          this.setState({[event.target.name]: event.target.value})
          }
       submitLogin(e){
           e.preventDefault();
           login(this.state)
           .then(res => 
             this.props.handleSuccessfulAuth()
           )
           .catch(err => 
              err)
           }

  render() {
    return (
      <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
              <div className="input-group">
                  <label htmlFor="e-mail">Username</label>
                  <input 
                    onChange={ this.handleInputChange }
                    className="login-input" 
                    type="text" 
                    name="email" 
                    placeholder="e-mail"/>
              </div>
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    onChange={ this.handleInputChange }
                    className="login-input" 
                    type="text" 
                    name="password" 
                    placeholder="password"/>
              </div>
              <p id="loginMessage"></p>
              <button 
              type="button" 
              className="login-btn" 
              onClick={ this
              .submitLogin
              .bind(this)}>Login</button>
          </div>
      </div>
    )
  }
}

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      message: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  submitRegister(e) {
    e.preventDefault();
    
    register(this.state)
    .then(res => res)
    .catch(err => err)
    }

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">First Name</label>
            <input
              onChange={ this.handleInputChange }
              type="text"
              name="fname"
              className="login-input"
              placeholder="First Name"/>
          </div>
          <div className="input-group">
            <label htmlFor="username">Last Name</label>
            <input
              onChange={ this.handleInputChange }
              type="text"
              name="lname"
              className="login-input"
              placeholder="Last Name"/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              onChange={ this.handleInputChange }
              type="text" 
              name="email" 
              className="login-input" 
              placeholder="Email"/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={ this.handleInputChange }
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>
          <p id='registrationMessage'></p>
          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}
export default Register;