import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateTask from './create_tasks/CreateTasks';
import axios from 'axios';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
  }
  
  async loadTasks() {
    //let response = await fetch(`http://localhost:3001/tasks`);
    let res = await axios.get(`http://localhost:3001/tasks`)
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
    });
    console.log(res.data);
    const tasks = res.data;
    console.log(tasks);
    this.setState({ tasks: tasks });
    
}
  
  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">To-do</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)}/>
          <CreateTask loadTasks={this.loadTasks}/>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">Done</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done === true)}/>
        </Col>
      </Row>
    );
  }
}

export default Tasks;