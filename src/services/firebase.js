import { useContext } from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { initFirestorter, Collection } from 'firestorter'

import { UserContext } from '../providers/UserProvider'

const firebaseConfig = {
  apiKey: 'AIzaSyBqGzOxHma7kdrGNap7vr1echbua1KiihY',
  authDomain: 'practice-860de.firebaseapp.com',
  databaseURL: 'https://practice-860de-default-rtdb.firebaseio.com',
  projectId: 'practice-860de',
  storageBucket: 'practice-860de.appspot.com',
  messagingSenderId: '717243383919',
  appId: '1:717243383919:web:ba4a341c218b41bc504d9a',
  measurementId: 'G-4CRF10Z9M7',
}

firebase.initializeApp(firebaseConfig)

initFirestorter({ firebase: firebase })

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then((result) => {
    console.log(result.user)
  })
}

const _getDocs = (path, callback) => {
  firestore
    .collection(path)
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return Object.assign(doc.data(), { id: doc.id, status: null })
      })
      callback(data)
    })
}

export const getTopics = (userId, callback) => {
  return _getDocs('users/' + userId + '/topics', callback)
}

export const getSessions = (userId, callback) => {
  return _getDocs('users/' + userId + '/sessions', callback)
}
