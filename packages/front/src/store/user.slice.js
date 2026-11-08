import { createSlice } from '@reduxjs/toolkit';

export const initialUserState = {
  data: null,
  selectedStudentId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData(state, { payload }) {
      state.data = payload;
    },
    setSelectedStudentId(state, { payload }) {
      state.selectedStudentId = payload;
    },
    logout() {
      return initialUserState;
    },
  },
});

export const { setUserData, setSelectedStudentId, logout } = userSlice.actions;
export default userSlice.reducer;
