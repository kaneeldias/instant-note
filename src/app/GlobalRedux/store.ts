"use client"

import { configureStore } from "@reduxjs/toolkit";
import noteListReducer from "./Features/noteList/noteListSlicer";

export const store = configureStore({
	reducer: {
		noteList: noteListReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;