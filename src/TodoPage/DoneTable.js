import React, { Component } from 'react'

export default class DoneTable extends Component {
    render=() =>
    <table className="table table-stripped table-borderd text-center text-white">
    <thead>
      <tr><th>Description</th><th>Done</th><th>Remove</th></tr>
    </thead>
    <tbody>{this.props.doneBody}</tbody>
  </table>
}
