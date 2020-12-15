import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import components
import { Intro } from "./components/Intro";
import { Footer } from "./components/Footer";
import { Bands } from "./components/Bands"


export class App extends React.Component {

  componentDidMount() {
  
  }

  render() {

    return (
      <div className="App">
        <Intro />
        <Bands />
        <Footer />
      </div>
    )
  }
};

export default App