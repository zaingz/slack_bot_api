import React from 'react';
import {render} from 'react-dom';
require("./styles/main.scss")



import AwesomeComponent from './components/awesome.jsx';

class App extends React.Component {
  render () {
     return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
      </div>
    );
  }
}
//helo;
render(<App/>, document.getElementById('app'));