const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({
  origin:"https://frontend-z8tx.onrender.com"
}));

app.use(express.json())

//ROUTES

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    console.log("New todo added")
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo

app.get("/todos", async (req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo


app.put("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]);

        res.json("Settel");
    } catch (error) {
        console.log(error.message)
    }
});

//delete a todo

app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        );

        res.json("Deleted")
    } catch (error) {
        console.log(error.message);
    }
});

app.listen (PORT, () => {
    console.log(`Server has started at port ${PORT}`);
})