import { initFirebase } from '@/firebase/clientApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Head from 'next/head'

export default function SignIn() {
  const app = initFirebase()
  console.log(app)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result.user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>
      <div>
        <h1>Sign In</h1>
        <p>Please Sign In</p>
        <button onClick={signIn}>Sign In</button>
      </div>
    </>
  )
}
