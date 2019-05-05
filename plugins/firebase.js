import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.FIREBASE_CLIENT_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_CLIENT_DATABASE_URL,
  projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET
}

firebase.initializeApp(config)

const firestore = firebase.firestore()

const settings = {}

firestore.settings(settings)

export { firebase, firestore }
