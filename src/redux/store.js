import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/authSlice';
import docterSlice from './docter/docterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
  key: 'auth',
  storage,
  blacklist: ['phoneNumber', 'loading', 'error'],
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    docter: docterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default Store;
export const persistor = persistStore(Store);