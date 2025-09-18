import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
// import other reducers...

export const store = configureStore({
  reducer: {
    // other reducers...
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
