import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  addTodo,
  deleteTodo,
  editTodo,
  setIndexInEdit,
  toggleComplete,
} from "../store/todosSlice";

const TodoApp = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const indexInEdit = useSelector((state) => state.todos.indexInEdit);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAdd = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo({ text: newTodoText, completed: false }));
      setNewTodoText("");
    }
  };

  const handleDelete = (todoIndex) => {
    dispatch(deleteTodo(todoIndex));
  };

  const handleEdit = (todoIndex, updatedTodoText) => {
    dispatch(editTodo({ index: todoIndex, text: updatedTodoText }));
  };

  const handleEditClick = (todoIndex) => {
    dispatch(setIndexInEdit(todoIndex));
  };

  const handleToggleComplete = (todoIndex) => {
    dispatch(toggleComplete(todoIndex));
  };

  return (
    <Box p={{ xs: 2, sm: 4, md: 8 }} m="auto" maxWidth="md">
      <Typography variant="h2" style={{ textAlign: "center", marginBottom: 16 }}>
        My Todos
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            placeholder="ADD YOUR TODO"
            value={newTodoText}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            fullWidth
            variant="contained"
            style={{ height: "100%" }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <List>
        {todos.map((todo, i) => (
          <ListItem
            divider
            key={todo.text + i}
            alignItems="flex-start"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "inherit",
            }}
          >
            {indexInEdit === i ? (
              <TextField
                defaultValue={todo.text}
                fullWidth
                onBlur={(event) => {
                  handleEdit(i, event.target.value);
                }}
              />
            ) : (
              <ListItemText primary={todo.text} />
            )}
            <IconButton
              aria-label="mark as complete"
              onClick={() => handleToggleComplete(i)}
            >
              <CheckCircleIcon color={todo.completed ? "success" : "disabled"} />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => handleEditClick(i)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDelete(i)}>
              <DeleteIcon color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoApp;
