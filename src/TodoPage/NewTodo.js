import React, { Component } from "react";

export default class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
    };
  }
  updateNewItem = (event) => {
    this.setState({ newItem: event.target.value });
  };
  createNewTodo = () => {
    this.props.callback(this.state.newItem);
    this.setState({ newItem: "" });
  };
  handleKeypress = (event) => {
    if (event.key === 'Enter') {
        this.createNewTodo()
      }
};
  render = () => (
    <div className="my-3">
      <input
        className="form-control"
        value={this.state.newItem}
        onChange={this.updateNewItem}
        onKeyPress={this.handleKeypress}
      />
      <button
        className="btn btn-primary mt-1"
        type="submit"
        onClick={this.createNewTodo}
      >
        Add new Todo
      </button>
    </div>
  );
}
