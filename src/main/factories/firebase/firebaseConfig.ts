import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBWveynfNg9WQOiy9bAZkE3YUojva7q_kM',
  authDomain: 'fordev-ccd2a.firebaseapp.com',
  databaseURL: 'https://fordev-ccd2a-default-rtdb.firebaseio.com',
  projectId: 'fordev-ccd2a',
  storageBucket: 'fordev-ccd2a.appspot.com',
  messagingSenderId: '111139295973',
  appId: '1:111139295973:web:fd8c0aa60f7517f18dba0c',
  measurementId: 'G-LN8HPEDB2R'
};

export const app = initializeApp(firebaseConfig);
