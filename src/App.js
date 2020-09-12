import './App.css';
import React, { Component } from 'react'
import MainPage from './TodoPage/main'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h1 className="text-center">Todo's List</h1>
          <MainPage/>
          </div>
      </div>
    )
  }
}


