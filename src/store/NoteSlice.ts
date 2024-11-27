import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../types/index";

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initializeNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    pinNote: (
      state,
      action: PayloadAction<{
        id: string;
        pinned: boolean;
        pinnedDate: string | null;
      }>
    ) => {
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
  (state: { notes: NoteState }) => state.notes,
  (noteSlice) => noteSlice.notes
);

export const { initializeNotes, addNote, updateNote, deleteNote, pinNote } =
  NoteSlice.actions;

export default NoteSlice.reducer;
