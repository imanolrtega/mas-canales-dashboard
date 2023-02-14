import { Channel } from '@/types/channel'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { initFirebase } from '@/firebase/clientApp'
import { Inter } from '@next/font/google'
import { useEffect, useState, Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

import DeleteIcon from '@/icons/delete'
import EditIcon from '@/icons/edit'
import Form from '@/components/form'

const db = getFirestore(initFirebase())
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'channels'),
      querySnapshot => {
        const docs = [] as Channel[]
        querySnapshot.forEach(doc => {
          docs.push(doc.data() as Channel)
        })
        setChannels(docs)
      }
    )
    return unsubscribe
  }, [])

  return (
    <>
      <Head>
        <title>+ Canales | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['main']}>
        <div className={styles['center']}>
          <div className={styles['center']}>
            <Image
              alt="13"
              src="/logo/mas-canales-logo.png"
              height={49}
              width={169}
              priority={true}
            />
          </div>
          <div className={`${styles['table']} ${inter.className}`}>
            <div className={styles['table-head']}>
              <h3>Canales</h3>
            </div>
            <div className={styles['table-body']}>
              {channels.map(channel => (
                <div key={channel.id} className={styles['table-cell']}>
                  <div className={styles['cell-col']}>
                    <div className={styles['cell-name']}>{channel.name}</div>
                  </div>
                  <div className={styles['cell-col']}>
                    <div className={styles['cell-buttons']}>
                      <button title="Editar Canal"><EditIcon /></button>
                      <button title="Eliminar Canal"><DeleteIcon /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles['form-container']} ${inter.className}`}>
            <Form />
          </div>
        </div>
      </main>
    </>
  )
}