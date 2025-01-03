import { configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import doctorSlice from './doctor/doctorSlice';
import authReducer from '../redux/user/authSlice';
import newSlice from '../redux/news/newsSlice';
import hospitalSlice from '../redux/hospital/hospitalSilder';
import contactSlice from '../redux/contact/contactSlice';
import scheduleSlice from './schedule/scheduleSlice';
import paymentSlice from './payment/paymentSlice';
import appointmentSlice from './appointment/appointmentSlice';
import bookingSlice from './booking/bookingSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn', 'user', 'phoneNumber'],
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
};

const bookingPersistConfig = {
  key: 'booking',
  storage,
  transforms: [encryptTransform({ secretKey: 'lvhai-16072002' })],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const bookingPersistReducer = persistReducer(bookingPersistConfig, bookingSlice);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    doctor: doctorSlice,
    new: newSlice,
    hospital: hospitalSlice,
    contact: contactSlice,
    schedule: scheduleSlice,
    payment: paymentSlice,
    appointment: appointmentSlice,
    booking: bookingPersistReducer,
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
