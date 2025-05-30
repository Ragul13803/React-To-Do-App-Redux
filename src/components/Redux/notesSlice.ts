import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  description: string;
}

interface NotesState {
  notes: Note[];
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [],
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    }
  },
});

export const { addNote, editNote, deleteNote, setSearchQuery, setNotes  } = notesSlice.actions;
export default notesSlice.reducer;