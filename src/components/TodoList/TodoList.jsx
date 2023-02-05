import { useState, useEffect } from "react";
import { TextField } from '@mui/material'
import Lista from "../Lista/Lista";
import service from '../../services/todos'

const TodoList = () => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
        service
            .getAll()
            .then(initialTodos => {
                setList(initialTodos)
            })
    }, [])

    const addTodo = (e) => {
        e.preventDefault()
        setList(list.concat(value))

        const todoObject = {
            content: value,
            status: "To do"
        }

        service
            .create(todoObject)
            .then(returnedTodo => {
                setList(list.concat(returnedTodo))
                setValue('')
            })
    }

    return (
        <>
            <form onSubmit={(e) => addTodo(e)}>
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        placeholder="Add Todo..."
                        onChange={(event) => {
                            setValue(event.target.value)
                        }}
                        value={value}
                    />
                </div>
            </form>

            <Lista
                list={list}
                setList={setList}
            />
        </>
    )
}

export default TodoList