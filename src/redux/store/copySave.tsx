import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value: [],
};

const copySave = createSlice({
  name: "counter",
  initialState,
  reducers: {
    copyData: (state, action) => {
      state.value.push(action.payload);
    },
    removeData: (state) => {
      state.value = [];
    },
  },
});

export const { copyData, removeData } = copySave.actions;

export default copySave.reducer;
