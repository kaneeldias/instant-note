'use client';

import { GetNotesResponseElement } from "@/app/types/note-types";
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	notesList: [] as GetNotesResponseElement[]
};

export const notesListSlice = createSlice({
	name: 'notesList',
	initialState,
	reducers: {
		addToNotesList: (state, action) => {
			const noteIndex = state.notesList.findIndex((note) => note.id === action.payload.id);
			if (noteIndex == -1) state.notesList.push(action.payload);
		},
		removeFromNotesList: (state, action) => {
			console.log(current(state));
			state.notesList = state.notesList.filter(note => note.id !== action.payload);
			console.log(current(state));
		},
		updateNoteInNotesList: (state, action) => {
			const noteIndex = state.notesList.findIndex((note) => note.id === action.payload.id);
			if (noteIndex == -1) return;
			state.notesList[noteIndex] = action.payload;
		}
	}
})

export const { addToNotesList, removeFromNotesList, updateNoteInNotesList } = notesListSlice.actions;

export default notesListSlice.reducer;