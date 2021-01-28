import React, {Component} from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    userInput: ''
  };

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value});
  };

  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index,1);
    const updateText = text.join('');
    this.setState({userInput: updateText})
  };

  render() {
    const charList = this.state.userInput.split('').map((c,index) => {
     return <Char 
     element={c} 
     key={index}
     delete={() => this.deleteCharHandler(index)}/>
    });
  return (
    <div className="App">
      <p>Time to Solve An Asignment</p>
      <input 
      type="text" 
      onChange={this.inputChangedHandler} 
      value = {this.state.userInput}/>
      <p>{this.state.userInput}</p>
      <Validation length = {this.state.userInput.length}/>
      {charList}
    </div>
  );
}
}

export default App;
