import styles from './Table.module.scss'

import DeleteIcon from '@/icons/delete'
import EditIcon from '@/icons/edit'
import { Channel } from '@/types/channel'

type Table = {
  channels: Channel[]
}

export default function Table(
  { channels }: Table
) {
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
                <button title="Eliminar Canal">
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
