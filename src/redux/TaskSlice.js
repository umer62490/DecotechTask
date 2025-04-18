import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        ...action.payload,
      };
      state.taskList.push(task);
    },
    updateTask: (state, action) => {
      const index = state.taskList.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.taskList[index] = {
          ...state.taskList[index],
          ...action.payload,
        };
      }
    },
    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(task => task.id !== action.payload);
    },
    reorderTask: (state, action) => {
      const { status, tasks } = action.payload;
      state.taskList = state.taskList
        .filter((t) => t.status !== status)
        .concat(tasks);
    }
  },
});

export const { addTask, updateTask, deleteTask , reorderTask} = taskSlice.actions;
export default taskSlice.reducer;




/*
Ek initial empty array banaya taskList ke liye jismein saare tasks store honge.
Slice ka naam "tasks" rakha jo Redux store mein is slice ko identify karega.
Har task ko unique ID (nanoid()) di jati hai.
Jo data aap form se bhejte ho (title, description, status, etc.) wo action.payload se milta hai.
taskList mein se correct task find ki jati hai using id.
Agar mil jaye to usi task ko update kiya jata hai by merging old data with new payload data.
taskList mein se given id ki task ko filter karke remove kiya jata hai.







*/