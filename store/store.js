import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import cameraSlice from '@/redux/cameraSlice';

const loggerMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type.startsWith('questions/')) {
      console.log('Questions state updated:', store.getState().questions);
    }
    return result;
  };

export const makeStore = () =>
  configureStore({
    reducer: {
      questions: questionsReducer,
      camera: cameraSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
  });

export const wrapper = createWrapper(makeStore, {debug: false});


