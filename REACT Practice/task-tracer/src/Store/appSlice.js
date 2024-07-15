import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddForm: false,
  showApiData: false,
  editTask: false,
  editedData: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAddForm(state) {
      state.showAddForm = !state.showAddForm;
    },
    toggleApiData(state) {
      state.showApiData = !state.showApiData;
    },
    toogleEditTask(state, action) {
      state.editTask = ! state.editTask;
    },
    setEditedData(state, action) {
      state.editedData = action.payload;
    },
  },
});

export const { toggleAddForm, toggleApiData, toogleEditTask, setEditedData } = appSlice.actions;
export default appSlice.reducer;
