import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../lib/api';

// 🔧 Use Mongo's `_id` field
export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface State {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: State = { items: [], loading: false, error: null };

/* -------------------- THUNKS -------------------- */

// UI calls: dispatch(fetchTodos())
export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetch',
  async () => await http.get<Todo[]>('/api/todos')
);

// UI calls: dispatch(addTodo({ title }))
export const addTodo = createAsyncThunk<Todo, { title: string }>(
  'todos/add',
  async ({ title }) => await http.post<Todo>('/api/todos', { title })
);

// UI calls: dispatch(toggleTodo({ id: _id, completed }))
export const toggleTodo = createAsyncThunk<Todo, { id: string; completed: boolean }>(
  'todos/toggle',
  async ({ id, completed }) =>
    await http.patch<Todo>(`/api/todos/${id}`, { completed })
);

// UI calls: dispatch(deleteTodo({ id: _id }))
export const deleteTodo = createAsyncThunk<{ id: string }, { id: string }>(
  'todos/delete',
  async ({ id }) => {
    await http.delete(`/api/todos/${id}`);
    return { id };
  }
);

/* -------------------- SLICE -------------------- */

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchTodos.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTodos.fulfilled, (s, a: PayloadAction<Todo[]>) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTodos.rejected,  (s, a) => { s.loading = false; s.error = a.error.message ?? 'Failed to load'; })

      .addCase(addTodo.fulfilled, (s, a: PayloadAction<Todo>) => {
        s.items.unshift(a.payload);
      })

      .addCase(toggleTodo.fulfilled, (s, a: PayloadAction<Todo>) => {
        const i = s.items.findIndex(t => t._id === a.payload._id);
        if (i > -1) s.items[i] = a.payload;
      })

      .addCase(deleteTodo.fulfilled, (s, a: PayloadAction<{ id: string }>) => {
        s.items = s.items.filter(t => t._id !== a.payload.id);
      });
  },
});

export default todosSlice.reducer;

// If your store is currently JS (store.js), keep `any`.
// When you migrate to store.ts and export RootState, change this to (state: RootState)
export const selectTodos = (state: any) => state.todos.items;
