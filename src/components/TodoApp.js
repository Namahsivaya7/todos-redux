import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
} from '@mui/material';
import { addTodo, deleteTodo, editTodo, setIndexInEdit } from '../store/todosSlice';

const TodoApp = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const todos = useSelector((state) => state.todos.todos);
  const indexInEdit = useSelector((state) => state.todos.indexInEdit);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setNewTodoText(event.target.value);
  };

  const handleAdd = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
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

  return (
    <Box m={16} ml={32} mr={32}>
      <Typography variant="h2" style={{ textAlign: 'center', marginBottom: 16 }}>
        My Todos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            placeholder="ADD YOUR TODO"
            value={newTodoText}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="contained" style={{ height: 56 }} onClick={handleAdd}>
            Add
          </Button>
        </Grid>
      </Grid>
      <List>
        {todos.map((todo, i) => (
          <ListItem divider key={todo + i}>
            {indexInEdit === i ? (
              <TextField
                defaultValue={todo}
                fullWidth
                onBlur={(event) => {
                  handleEdit(i, event.target.value);
                }}
              />
            ) : (
              <ListItemText primary={todo} />
            )}
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
