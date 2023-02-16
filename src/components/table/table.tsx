import { Channel } from '@/types/channel'
import { orderAlphabetically } from '@/utils/common'
import { useEffect, useRef } from 'react'
import styles from './Table.module.scss'

import DeleteIcon from '@/icons/delete'
import EditIcon from '@/icons/edit'
import Loader from '../loader/loader'

type Table = {
  channels: Channel[]
  handleDeleteModal: (channel: Channel) => void
  loading: boolean
  setChannelToEdit: (value: Channel) => void
  setEditChannel: (value: boolean) => void
  setOpenModal: (value: boolean) => void
}

export default function Table({
  channels,
  handleDeleteModal,
  loading,
  setChannelToEdit,
  setEditChannel,
}: Table) {
  const tableRef = useRef<HTMLDivElement>(null)
  const handleEdit = (channel: Channel) => {
    setEditChannel(true)
    setChannelToEdit(channel)
  }
  orderAlphabetically(channels)

  useEffect(() => {
    const scrollableTable = tableRef.current
    if (scrollableTable) {
      scrollableTable.style.height = `${scrollableTable.scrollHeight}px`
      setTimeout(() => {
        scrollableTable.scrollTo({
          top: scrollableTable.scrollHeight,
          behavior: 'smooth',
        })
      }, 500)
    }
  }, [channels])

  return (
    <div className={styles['table']}>
      <div className={styles['table-head']}>
        <h3>Lista de canales</h3>
      </div>
      <div ref={tableRef} className={styles['table-body']}>
        {channels.map(channel => (
          <div key={channel.id} className={styles['table-cell']}>
            <div className={styles['cell-col']}>
              <div className={styles['cell-name']}>{channel.name}</div>
            </div>
            <div className={styles['cell-col']}>
              <div className={styles['cell-buttons']}>
                <button
                  title="Editar Canal"
                  onClick={() => handleEdit(channel)}
                >
                  <EditIcon />
                </button>
                <button
                  title="Eliminar Canal"
                  onClick={() => handleDeleteModal(channel)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        {channels.length === 0 && !loading && (
          <p style={{ textAlign: 'center' }}>Todavía no has agregado canales</p>
        )}
        {loading && <Loader />}
      </div>
    </div>
  )
}
