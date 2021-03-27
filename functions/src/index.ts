import * as functions from "firebase-functions";
import firebase from 'firebase';
import config from './config';
import app from './app';

const firebaseObject = config.firebaseApp;
firebase.initializeApp(firebaseObject);

export const api = functions.https.onRequest(app);
