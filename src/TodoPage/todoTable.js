import React, { Component } from "react";

export default class TodoTable extends Component {

  render() {
    return (
      <div>
        <table className="table table-stripped table-borderd text-center text-white">
          <thead>
            <tr><th>TO DO LIST</th><th>DONE</th><th>CHANGE</th></tr>
          </thead>
          <tbody>{this.props.todoBody}</tbody>
        </table>
      </div>
    );
  }
}
