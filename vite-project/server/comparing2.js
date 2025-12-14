app.delete("/todos/:id", async (req,res) => {
    try {
        const id = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
        [id]
        );

        res.json("Deleted")
    } catch (error) {
        console.log(error.message);
    }
});