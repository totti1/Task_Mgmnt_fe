import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';

const reducer = {
  user: UserSlice,

};

const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store