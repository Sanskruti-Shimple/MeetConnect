import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviews: [],
};

const interviewSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    setInterviews: (state, action) => {
      state.interviews = action.payload;
    },

    addInterview: (state, action) => {
      state.interviews.push(action.payload);
    },

    markCompleted: (state, action) => {
      const interview = state.interviews.find(
        (i) => i._id === action.payload.id || i.id === action.payload.id
      );

      if (interview) {
        interview.status = "completed";
        interview.score = action.payload.score;
        interview.feedback = action.payload.feedback;
      }
    },
  },
});

export const { setInterviews, addInterview, markCompleted } = interviewSlice.actions;
export default interviewSlice.reducer;