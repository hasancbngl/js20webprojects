import './App.css'
import React, {Component} from 'react';
import UserInput from './UserComponents/UserInput'
import UserOutput from './UserComponents/UserOutput'


class App extends Component {

  state = {
    username: 'Albert',
    state: ''
  };

 usernameHandler = (event) => {
   this.setState({username: event.target.value});
 }

  render() {
  return (
    <div>
      <UserOutput 
      className="userOutput"
      username={this.state.username}></UserOutput>
      <UserOutput username="ali"></UserOutput>
      <br/>
      <UserInput changed={this.usernameHandler} currentName={this.state.username}></UserInput>
      <input type="text"></input>
    </div>
  );
  }
}

export default App;
