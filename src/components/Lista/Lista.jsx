import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemSecondaryAction, IconButton, ListItem, ListItemText, List, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Col, Row, Container } from 'react-bootstrap'
import service from '../../services/todos'

const Lista = ({ list, setList }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        service
            .getAll()
            .then(initialTodos => {
                setStatus(initialTodos)
            })
    }, [])

    const handleStatusChange = (event) => {
        setStatus(event.target.value.toString());
    };

    const deleteTodo = (id) => {
        if (window.confirm(`Delete task?`)) {
            service
                .remove(id, list)
                .then(returnedTodo => {
                    let row = document.getElementById(`todorow${id}`)
                    setList(list.map(task => task.id !== id ? task : returnedTodo))
                    row.remove()
                })
        }
    }

    return (
        <Container>
            {list.map((todo, index) => (

                <Row key={index} id={`todorow${todo.id}`}>
                    <Col md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={status}
                                label="Age"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={"To do"}>To do</MenuItem>
                                <MenuItem value={"In progress"}>In progress</MenuItem>
                                <MenuItem value={"Blocked"}>Blocked</MenuItem>
                                <MenuItem value={"Completed"}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Col>
                    <Col md={{ span: 7, offset: 1 }}>
                        <List>
                            <ListItem key={index} button>
                                <ListItemText primary={todo.content} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => {
                                            deleteTodo(todo.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default Lista