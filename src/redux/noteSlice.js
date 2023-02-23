import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  isLoading: false,
  filterNotes: [],
  activeLink: "",
};

export const getNotes = createAsyncThunk(
  "noteSlice/getNotes",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/notes`);

      dispatch(setFilterNotes(data.data));
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const saveNote = createAsyncThunk(
  "noteSlice/saveNote",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/notes`, arg);

      dispatch(getNotes());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "noteSlice/deleteNote",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/notes/${id}`);

      dispatch(getNotes());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "noteSlice/updateNote",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`/notes/${arg._id}`, arg);

      dispatch(getNotes());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilterNotes: (state, action) => {
      state.filterNotes = action.payload;
    },
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },

  extraReducers: (builder) => {
    //getNotes
    builder.addCase(getNotes.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //SAVENOTE

    builder.addCase(saveNote.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(saveNote.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(saveNote.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //deleteNotes

    builder.addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //updateNote

    builder.addCase(updateNote.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const { setLoading, setFilterNotes,setActiveLink} = noteSlice.actions;

export default noteSlice.reducer;
