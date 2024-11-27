import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initializeNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              pinned: action.payload.pinned,
              pinnedDate: action.payload.pinnedDate,
            }
          : note
      );
    },
  },
});

export const NoteSliceSelector = createSelector(
  (state) => state.notes,
  (noteSlice) => noteSlice.notes
);

export const { initializeNotes, addNote, updateNote, deleteNote, pinNote } =
  NoteSlice.actions;

export default NoteSlice.reducer;
