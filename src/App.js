import React from 'react';
import { BrowserRouter as  Router, Switch, Route} from 'react-router-dom';
import './App.css';
import './grid/grid.css';
import Toolbar from './toolbar/Toolbar';
import Hero from './hero/Hero';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import Home from './home/Home';
import Settings from './components/profile/Settings';
import { isAuthenticated, getUserInfo } from './autho/Repository';
import UserLogin from './register/UserLogin';


class App extends React.Component {
  constructor(){
    super();
      this.state = {
        isLoggedIn: false,
        userDetails: [],
        overlay: false  
      }
      this.handleLogin = this.handleLogin.bind(this)
  }
  componentDidMount() {
    this.checkLoggedinStatus();
  }
  handleLogin(data) {
    this.setState({isLoggedIn: true, userDetails: data})
  }
  checkLoggedinStatus() {
    if( isAuthenticated() )
    getUserInfo()
        .then((userDetails) => {
            this.setState({
              isLoggedIn: true, 
              userDetails: userDetails})
        })
        .catch(err => {
            console.log(err);
            })
    else {}
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
      <div className="App" id="App">
        <Router> 
          <Toolbar  
            loginStatus={this.state.isLoggedIn}
            userDetails={this.state.userDetails}/>
          <Hero />
          <Switch>
            <React.Fragment>
            
              <div  className="main" id="main">
              <Route
                  exact 
                  path="/" 
                  render={props => (
                    <UserLogin 
                      {...props} 
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogin={this.handleLogin}/>
                  )} 
                  />
                <Route
                  exact 
                  path="/home" 
                  render={props => (
                    <Home 
                      {...props}
                      userDetails={this.state.userDetails} 
                      isLoggedIn={this.state.isLoggedIn}/>
                  )} 
                  />
                <Route
                  exact 
                  path="/settings" 
                  render={props => (
                    <Settings 
                      {...props}
                      userDetails={this.state.userDetails} 
                      isLoggedIn={this.state.isLoggedIn}/>
                  )} 
                  />
              </div>
            </React.Fragment>
          </Switch>
        </Router>
        {isLoggedIn === true ? '' : <Footer />}

      </div>
    );
  }
}

export default App;
