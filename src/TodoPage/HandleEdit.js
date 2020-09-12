import React, { Component } from "react";
import Popup from 'reactjs-popup';

export default class HandleEdit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             editedItem: ''
        }
    }
    updateCurrentItem= (event) =>{
        this.setState({editedItem: event.target.value})
    }
    
    editCurrentTodo= () =>{
        const id = this.props.id
        const editDict ={id : id, action: this.state.editedItem}
        this.props.callback(editDict)
        this.setState({editedItem:''})
    }
    
    handleKeypress = (event) => {
        if (event.key === 'Enter') {
            this.editCurrentTodo()
          }
    };

  render = () => (
    <Popup
      trigger={
        <button className="btn btn-warning">
          <i className="fa fa-pencil"></i>
        </button>
      }
    >
      <div><input onChange={this.updateCurrentItem} onKeyPress={this.handleKeypress} value={this.state.editedItem}></input></div>
    </Popup>
  );
}
