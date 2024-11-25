import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  indexInEdit: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
    },
    editTodo: (state, action) => {
      const { index, text } = action.payload;
      state.todos[index].text = text;
    },
    setIndexInEdit: (state, action) => {
      state.indexInEdit = action.payload;
    },
    toggleComplete: (state, action) => {
      const index = action.payload;
      state.todos[index].completed = !state.todos[index].completed;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setIndexInEdit, toggleComplete } =
  todosSlice.actions;

export default todosSlice.reducer;
