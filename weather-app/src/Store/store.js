import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { weatherApi } from '../Features/Services/weatherApi';
import cityReducer from '../Slice/citySlice';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [weatherApi.reducerPath], 
};

const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  city: cityReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(weatherApi.middleware),
});

export const persistor = persistStore(store);
export default store;
