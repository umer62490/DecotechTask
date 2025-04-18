import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = { id: nanoid(), ...action.payload };
      state.userList.push(user);
    },
    updateUser: (state, action) => {
      const index = state.userList.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.userList[index] = {
          ...state.userList[index],
          ...action.payload
        };
      }
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;


/*

Har naya user create karne par ek unique id generate hoti hai using nanoid().
Jo data form se aata hai (name, email, phone, role), usko ek user object bana kar userList mein push kiya jata hai.
userList mein se us user ka index find kiya jata hai jiska id match karta hai payload ke id se.
Agar user mil jaye to usi position par existing user ko update kiya jata hai by merging old data with new incoming data (spread operator se).
Is se naya user create nahi hota, sirf existing user update hota hai.
Jo user delete hona hai uska id payload mein milta hai.
filter() ki help se us user ko userList se hata diya jata hai.


*/