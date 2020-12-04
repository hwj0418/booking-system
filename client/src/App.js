import React from "react";
import { render } from "react-dom";
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      apiResponds: ""
    };
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => this.setState({apiResponds:res}));
  }

  componentWillMount(){
    this.callAPI();
  }
}



export default App;
