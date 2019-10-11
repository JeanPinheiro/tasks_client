import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function CreateTask(props) {
    const [title, setTitle] = useState('');
    const [show, setShow] = useState('');

    const handleSubmit = (async () => {
    
        let res = await axios({ method: 'POST', 
                url: `http://localhost:3001/tasks/`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    task: { title: title, done: false} 
                })
            })
            .then(response => { 
            
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
        })

    console.log(res);
    setShow(false)
    setTitle('')
    props.loadTasks();
    });

    return (
    <div>
        <Button onClick={e => setShow(true)} variant="dark" className="float-right create_task_btn">+ Atividade</Button>

        <Modal show={show || false} onHide={e => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Nova Atividade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control type="email" placeholder="Digite sua atividade..." value={title || ''} onChange={e => setTitle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={e => setShow(false)}>
            Fechar
            </Button>
            <form onSubmit={handleSubmit}>
            <Button variant="dark" type="submit">
                Criar
            </Button>
            </form>
        </Modal.Footer>
        </Modal>
    </div>
    );
}

export default CreateTask;