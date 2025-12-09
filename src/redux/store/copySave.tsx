import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value: []
};

const copySave = createSlice({
  name: "copy",
  initialState,
  reducers: {
    copyData: (state, action) => {
      state.value.push(action.payload);
    },
    removeData: (state) => {
      state.value = ["Không có dữ liệu"];
    }
  },
});

export const { copyData, removeData } = copySave.actions;

export default copySave.reducer;
