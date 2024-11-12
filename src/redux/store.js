import { configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import docterSlice from './docter/docterSlice';
import authReducer from '../redux/user/authSlice';
import newSlice from '../redux/news/newsSlice';
import hospitalSlice from '../redux/hospital/hospitalSilder';
import contactSlice from '../redux/contact/contactSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn', 'user', 'phoneNumber'],
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    docter: docterSlice,
    new: newSlice,
    hospital: hospitalSlice,
    contact: contactSlice,
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
