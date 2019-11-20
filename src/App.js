import React , {Component} from 'react';
import Books from './Components/Books';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
     // books : []
    };
  }

  render() {
    return (
      <div className="App container">
        <div className="library col-xs-12"><h2 className="my_library">My Library</h2></div>
        <Books/>
      </div>
    );
  }
}

export default App;
