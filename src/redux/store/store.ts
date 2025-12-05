import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import copySaveReducer from "./copySave";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cache: copySaveReducer
  }
});

// Types cho useSelector và useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
