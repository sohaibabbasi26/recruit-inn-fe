// store/slices/questionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async (techStack, thunkAPI) => {
        const token = thunkAPI.getState().auth.token; // Adjust based on your auth state structure
        const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/prepare-test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ expertise: techStack }),
        });
        const data = await response.json();
        if (response.ok) {
            return data.data; // Assuming data.data contains the array of questions
        } else {
            return thunkAPI.rejectWithValue(data.error);
        }
    }
);

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [],  
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Reducer to manually set questions (optional)
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload; // Assuming the payload is the questions array
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;