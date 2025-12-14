import React, {useEffect, useState} from "react";
import EditTodo from "./EditTodo";
import { API_URL } from "../api.js";

const ListTodo = ()=> {
    
    const [todos,setTodos] = useState([]);
    
    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`${API_URL}/todos/${id}`,{
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.log(error.message)
            setError("Failed to delete todos. Please try again later.");
        }
    }
    
    const getTodos = async() => {
        try {
            
            const response = await fetch(`${API_URL}/todos`);
            const jsonData = await response.json();

            setTodos(jsonData);

        } catch (error) {
            console.log(error.message)
            setError("Failed to fetch todos. Please try again later.");
        }
    }

    useEffect(()=>{
        getTodos();
    },[]); 
 
    return (
    <>
    <h1 className="mt-5">List todo</h1>
     <table className="table table-hover">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo=>(
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <EditTodo todo={todo} />
            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete </button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </>
    )
}

export default ListTodo