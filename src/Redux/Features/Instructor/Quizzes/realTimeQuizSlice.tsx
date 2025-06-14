import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RealTimeQuizState {
  connected: boolean;
  participants: Array<{ id: string; name: string; score: number }>;
  leaderboard: Array<{ id: string; name: string; score: number }>;
  currentQuestion: number | null;
  quizStarted: boolean;
  quizEnded: boolean;
}

const initialState: RealTimeQuizState = {
  connected: false,
  participants: [],
  leaderboard: [],
  currentQuestion: null,
  quizStarted: false,
  quizEnded: false,
};

const realTimeQuizSlice = createSlice({
  name: 'realTimeQuiz',
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
    setParticipants(state, action: PayloadAction<RealTimeQuizState['participants']>) {
      state.participants = action.payload;
    },
    setLeaderboard(state, action: PayloadAction<RealTimeQuizState['leaderboard']>) {
      state.leaderboard = action.payload;
    },
    setCurrentQuestion(state, action: PayloadAction<number | null>) {
      state.currentQuestion = action.payload;
    },
    setQuizStarted(state, action: PayloadAction<boolean>) {
      state.quizStarted = action.payload;
    },
    setQuizEnded(state, action: PayloadAction<boolean>) {
      state.quizEnded = action.payload;
    },
  },
});

export const {
  setConnected,
  setParticipants,
  setLeaderboard,
  setCurrentQuestion,
  setQuizStarted,
  setQuizEnded,
} = realTimeQuizSlice.actions;

export default realTimeQuizSlice.reducer;
