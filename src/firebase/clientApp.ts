import { initializeApp, getApp } from 'firebase/app'

function initialize() {
  try {
    console.log(
      'Patience is a path to wisdom; be still and find your own strength...'
    )
    return getApp()
  } catch (any) {
    console.log('Initializing Firebase App... 🫡')
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
    return initializeApp(firebaseConfig)
  }
}

const app = initialize()

export const initFirebase = () => {
  return app
}
