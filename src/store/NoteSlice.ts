import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      title: "Sample Note 1",
      tagline: "Tagline for Sample Note 1",
      body: "This is the body of Sample Note 1.",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Sample Note 2",
      tagline: "Tagline for Sample Note 2",
      body: "This is the body of Sample Note 2.",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Sample Note 3",
      tagline: "Tagline for Sample Note 3",
      body: "This is the body of Sample Note 3.",
      date: new Date().toISOString(),
    },
  ],
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initializeNotes: (state, action) => {
      state.notes = action.payload.notes;
    },
    addNote: (state, action) => {
      const note = {
        id: action.payload.id,
        title: action.payload.title,
        tagline: action.payload.tagline,
        body: action.payload.body,
        date: action.payload.date,
      };
      state.notes.push(note);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              title: action.payload.title,
              tagline: action.payload.tagline,
              body: action.payload.body,
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

export default NoteSlice.reducer;

export const {
  initializeNotes,
  addNote,
  deleteNote,
  updateNote,
} = NoteSlice.actions;
