import { Channel } from '@/types/channel'
import {
  collection,
  doc,
  deleteDoc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'
import { initFirebase } from '@/firebase/clientApp'
import { Rubik } from '@next/font/google'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

import Form from '@/components/form/form'
import Table from '@/components/table/table'
import Modal from '@/components/modal/modal'

const db = getFirestore(initFirebase())
const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [channelToEdit, setChannelToEdit] = useState<Channel>({} as Channel)
  const [channelToDelete, setChannelToDelete] = useState<Channel>({} as Channel)
  const [editChannel, setEditChannel] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'channels'),
      querySnapshot => {
        const docs = [] as Channel[]
        querySnapshot.forEach(doc => {
          docs.push({ ...doc.data(), docId: doc.id } as Channel)
        })
        setChannels(docs)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  const handleDeleteModal = async (channel: Channel) => {
    setOpenModal(true)
    setChannelToDelete(channel)
  }

  const handleDelete = async (docId: string) => {
    try {
      await deleteDoc(doc(db, 'channels', docId))
      setOpenModal(false)
    } catch (error) {
      console.error('Error deleting document: ', error)
    }
  }

  return (
    <>
      <Head>
        <title>+ Canales | Dashboard</title>
        <meta name="description" content="A minimalist dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['main']}>
        <div className={styles['fancy-container']}>
          <div className={styles['logo-container']}>
            <Image
              alt="13"
              src="/logo/mas-canales-logo.png"
              height={49}
              width={169}
              priority={true}
            />
          </div>
          <div className={`${styles['content']} ${rubik.className}`}>
            <div className={styles['form-container']}>
              <Form
                channelToEdit={channelToEdit}
                editChannel={editChannel}
                setChannelToEdit={setChannelToEdit}
                setEditChannel={setEditChannel}
              />
            </div>
            <div className={styles['table-container']}>
              <Table
                channels={channels}
                handleDeleteModal={handleDeleteModal}
                loading={loading}
                setChannelToEdit={setChannelToEdit}
                setEditChannel={setEditChannel}
                setOpenModal={setOpenModal}
              />
            </div>
          </div>
        </div>
        {openModal && (
          <Modal setOpenModal={setOpenModal}>
            <div className={`${styles['modal-container']} ${rubik.className}`}>
              <div className={styles['modal-header']}>
                <h3>Eliminar a {channelToDelete.name}</h3>
              </div>
              <div className={styles['modal-body']}>
                <button
                  className={styles['delete']}
                  onClick={() => handleDelete(channelToDelete.docId)}
                  title="Eliminar"
                >
                  Eliminar
                </button>
                <button onClick={() => setOpenModal(false)} title="Cancelar">
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </>
  )
}
