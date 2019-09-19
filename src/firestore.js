import firebase from 'firebase/app'
import 'firebase/firestore'
import { config } from './firestoreCredentials'

const firestore = firebase.initializeApp(config);
const db = firestore.firestore();

export default db;