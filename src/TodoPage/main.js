import React, { Component } from 'react';
import TodoTable from './todoTable';
import DoneTable from './DoneTable';
import axios from 'axios';
import {Alert} from 'reactstrap';
import NewTodo from './NewTodo';
import 'reactjs-popup/dist/index.css'
import HandleEdit from './HandleEdit';
//imported reactjs-popup, and font-awesome, and reactstrap

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             todoItems:[{action:"Lists item - number one", done:false , id:1},
            {action:"Lists Item - number 2", done: false , id: 2}, {action:"List item- number three", done: true , id:3}],
            doneItems:[] ,
            visible: false
        }
    }
     componentDidMount(){
        axios.get('http://localhost:3002/todos').then(response => response.data.map(res =>
            this.setState({todoItems: [...this.state.todoItems,{id: res._id, action: res.action, done: res.done}]})
        ))
        .catch(err => console.log(err))
    }

    updateNewInput = (event) =>{
        this.setState({newItem: event.target.value})
    }
    createNewITem = (task) =>{
        const empteyCheck = task.trim()
        if(!this.state.todoItems.find(item => item.action === task) && empteyCheck !== "" && task.length > 3){
            this.setState({
                todoItems:[...this.state.todoItems, {action: task, done:false}],
                visible : false
            })}
        else{
            this.setState({visible: !this.state.visible})
        }

        
    }
    todoTableRow= () => this.state.todoItems
    .filter(item => item.done === false).map( Item =>
        <tr key={Item.action}>
            <td>{Item.action}</td>
            <td><button className="btn btn-success" onClick={this.doneButtonPressed(Item.id)}><i className="fa fa-check" /></button></td>
            <td><HandleEdit id={Item.id} callback={this.updateTodoList}/></td>
        </tr>
    )
    doneTableRow= () =>this.state.todoItems
    .filter(item => item.done === true).map(done =>
        <tr key={done.action} style={{ textDecorationLine: 'line-through'}}>
            <td>{done.action}</td>
            <td><button className="btn btn-success" ><i className="fa fa-check" /></button></td>
            <td><button className="btn btn-danger"><i className="fa fa-trash" /></button></td>
        </tr>
    )
    updateTodoList= (updatedItem) =>{
        const empteyCheck = updatedItem.action.trim()
        if(empteyCheck !== "" && updatedItem.action.length > 3){
            this.setState({visible: false})
            this.setState(prev => ({
                todoItems: prev.todoItems.map(item => item.id === updatedItem.id ? {...item, action: updatedItem.action} : item)
            }))
        }else{
            this.setState({visible: true})
        }
    }

    toggleAlert =() =>{
        this.setState({visible: !this.state.visible})
    }
    doneButtonPressed =(id) =>{
        this.setState(prev => ({
            todoItems: prev.todoItems.map(item => item.id === id ? {...item, done: false}: item)
        }))
    }
    render= () =>
    <div className="row">
        <div className="container">
             <NewTodo callback={this.createNewITem}/>
            <Alert isOpen={this.state.visible} color="danger" toggle={this.toggleAlert}>It's impartive to insert a valid input</Alert>
             <TodoTable todoBody={this.todoTableRow()}/>
             <DoneTable doneBody={this.doneTableRow()}/>
        </div>
        
       
    </div>
}
