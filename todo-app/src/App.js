import React, { useCallback, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted= useCallback((event) => {
    event.preventDefault();
    if(newTodo.trim()) {
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          content: newTodo,
          done:false,
        },
        ...todos
      ]);
      setNewTodo('');
    };

  },[newTodo, todos]);

  useEffect(() => {
    console.log('todos: ', todos);
  }, [todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = todos.slice();
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos);
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  },[todos]);

  const markAllDone = useCallback(() => {
      const updateTodos = todos.map(todo => {
        return {
          ...todo,
          done: true,
        };
      });
      setTodos(updateTodos);
  }, [todos]);



  return (
    <div className="App">
     <Container>
        <h1 style={{textAlign: "center"}}>ToDo App</h1>
        <Form onSubmit={formSubmitted}>
          <Form.Group controlId="newTodo">
            <Form.Control type="text" placeholder="Enter a ToDo" name='newTodo' value={newTodo} onChange={onNewTodoChange}></Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
        <br></br>
        <Button variant='info' onClick={markAllDone}>Mark all as done</Button>
        <br></br>
        <br></br>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Done</th>
              <th>Task</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>
                  <Form.Group>
                    <Form.Check type='checkbox' checked={todo.done} onChange={addTodo(todo, index)}/>
                  </Form.Group>
                </td>
                <td>
                  <span className={todo.done ? 'done todo' : 'todo'}>{todo.content}</span>
                </td>
                <td>
                  <Button variant="danger" onClick={removeTodo(todo)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </Container>
    </div>
  )
};


export default App;
