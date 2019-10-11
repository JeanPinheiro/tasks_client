import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

class List extends Component {
    
    async deleteTask(task) {
        if (window.confirm(`Tem certeza que vai apagar: "${task.title}" ?`)) {
        //await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'});

        let res = await axios({ method: 'DELETE', url: `http://localhost:3001/tasks/${task.id}` })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        });
        console.log(res);
        this.props.loadTasks();
        }
    }

    async checkTask(task) {
        let form = {'task': {'done': 'true'}}
        
        let res = await axios({ method: 'PUT', 
                url: `http://localhost:3001/tasks/${task.id}`,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                  task: { done: true } 
                })
               })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
        });
        console.log(res);
        this.props.loadTasks();
      }

    render() {
      return (
        <div>
          <Card>
            <Card.Body>
            <Table responsive>
              <tbody>
                {this.props.tasks.map((task, index) => {
                  return <tr key={task.id}>
                    <td className="col-md-10">{task.title}</td>
                    <td>
                      { 
                        task.done == false
                        ? <a className="check" href="#">
                            <FontAwesomeIcon icon="check-circle" onClick={() => this.checkTask(task)} size="lg"/>
                          </a> 
                        : null
                      }
                    </td>
                    <td>
                      <a className="delete" href="#" onClick={() => this.deleteTask(task)}>
                        <FontAwesomeIcon icon="trash-alt"/>
                      </a>
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }

export default List;