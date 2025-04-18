import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import taskReducer from './TaskSlice'


export const store = configureStore({
    reducer: {
      users: userReducer,
      tasks: taskReducer,
    },
  });