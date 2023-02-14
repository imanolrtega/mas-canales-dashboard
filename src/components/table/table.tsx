import { Channel } from '@/types/channel'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import { initFirebase } from '@/firebase/clientApp'
import styles from './Table.module.scss'

import DeleteIcon from '@/icons/delete'
import EditIcon from '@/icons/edit'

const db = getFirestore(initFirebase())

type Table = {
  channels: Channel[],
}

export default function Table({ channels }: Table) {
  const handleDelete = async (docId: string) => {
    console.log('Epa!')
    try {
      await deleteDoc(doc(db, 'channels', docId))
      console.log(docId)
      console.log('Se intentó!')
      //setChannels(channels.filter(channel => channel.id !== id))
    } catch (error) {
      console.error('Error deleting document: ', error)
    }
  }

  return (
    <div className={styles['table']}>
      <div className={styles['table-head']}>
        <h3>Lista de canales</h3>
      </div>
      <div className={styles['table-body']}>
        {channels.map(channel => (
          <div key={channel.id} className={styles['table-cell']}>
            <div className={styles['cell-col']}>
              <div className={styles['cell-name']}>{channel.name}</div>
            </div>
            <div className={styles['cell-col']}>
              <div className={styles['cell-buttons']}>
                <button title="Editar Canal">
                  <EditIcon />
                </button>
                <button
                  title="Eliminar Canal"
                  onClick={() => handleDelete(channel.docId)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
