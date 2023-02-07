import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ListItemSecondaryAction,
  IconButton,
  ListItem,
  ListItemText,
  List,
  FormControl,
} from "@mui/material";
import { Col, Row, Container } from "react-bootstrap";
import service from "../../services/todos";

const Lista = ({ list, setList }) => {
  const options = [
    {
      key: 1,
      value: "To do",
    },
    {
      key: 2,
      value: "In progress",
    },
    {
      key: 3,
      value: "Blocked",
    },
    {
      key: 4,
      value: "Completed",
    },
  ];
  const [status, setStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState(options);

  useEffect(() => {
    service.getAll().then((initialTodos) => {
      setStatus(options);
      setSelectedOption(initialTodos.status);
    });
  }, []);

  const handleChange = (e, id) => {
    console.log(id);
    const todo = list.find((n) => n.id === id);

    const changedStatus = { ...todo, status: todo.status };

    service
      .update(id, changedStatus)
      .then((returnedStatus) => {
        console.log(returnedStatus.status);
        console.log(status);
        setStatus(
          list.map((todo) => (todo.id !== id ? todo : returnedStatus.status))
        );
      })
      .catch((error) => {
        console.log(error);
        setStatus(list.filter((n) => n.id !== id));
      });

    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
  };

  const deleteTodo = (id) => {
    if (window.confirm(`Delete task?`)) {
      service.remove(id, list).then((returnedTodo) => {
        let row = document.getElementById(`todorow${id}`);
        setList(list.map((task) => (task.id !== id ? task : returnedTodo)));
        row.remove();
      });
    }
  };

  return (
    <Container>
      {list.map((todo, index) => (
        <Row key={index} id={`todorow${todo.id}`}>
          <Col md={3}>
            <FormControl fullWidth>
              {/* <select
                                id={`selectstatus${todo.id}`}
                                value={() => setStatus(options[0])}
                                onChange={(e) => handleChange(e, todo.id)}
                            >
                                <option value={status}>To do</option>
                                <option value={status}>In progress</option>
                                <option value={status}>Blocked</option>
                                <option value={status}>Completed</option>
                            </select> */}
              <select onChange={(e) => handleChange(e, todo.id)}>
                {options.map((x) => {
                  return (
                    <option key={x.key} value={x.key}>
                      {x.value}
                    </option>
                  );
                })}
              </select>
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
  );
};

export default Lista;
