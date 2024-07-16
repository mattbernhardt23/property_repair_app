import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";
import { extractErrorMessage } from "@utils/extractErrorMessage";

export const getProjects = createAsyncThunk(
  "projects/fetch",
  async (data, thunkAPI) => {
    try {
      console.log("in the slice");
      return await projectService.getProjects(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  }
);

export const getProject = createAsyncThunk(
  "project/set",
  async (index, thunkAPI) => {
    try {
      return await projectService.getProject(index);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  }
);

const initialState = {
  project: null,
  projects: [],
  isLoading: false,
  isError: false,
  message: "",
};

const projectDataSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.isLoading = false;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default projectDataSlice.reducer;
