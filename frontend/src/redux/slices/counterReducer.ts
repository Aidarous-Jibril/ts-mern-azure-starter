import { createSlice } from "@reduxjs/toolkit";

type CounterState = { value: number };

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    inc: (state) => { state.value += 1; },
    dec: (state) => { state.value -= 1; },
  },
});

export const { inc, dec } = counterSlice.actions;
export default counterSlice.reducer;
