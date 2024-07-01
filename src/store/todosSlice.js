import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  indexInEdit: -1,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      state.todos[action.payload.index] = action.payload.text;
      state.indexInEdit = -1;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    setIndexInEdit: (state, action) => {
      state.indexInEdit = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setIndexInEdit } = todosSlice.actions;
export default todosSlice.reducer;
