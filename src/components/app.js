import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Katherine Skipper Portfolio</h1>
        <div>
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
      </div>
    );
  }
}
