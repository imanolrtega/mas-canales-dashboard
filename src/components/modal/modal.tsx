import CloseIcon from '@/icons/close'
import { MouseEvent } from 'react'
import styles from './Modal.module.scss'

type Modal = {
  className?: string
  children: React.ReactNode
  setOpenModal: (value: boolean) => void
  title?: string
}

export default function Modal({
  className,
  children,
  setOpenModal,
  title,
}: Modal) {
  const handleInnerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`${styles['modal']} ${className}`}
      onClick={() => setOpenModal(false)}
    >
      <div
        className={`${styles['modal-content']} ${styles['modal-about']}`}
        onClick={(e) => handleInnerClick(e)}
      >
        <div className={styles['modal-header']}>
          <button
            className={styles['close-btn']}
            onClick={() => setOpenModal(false)}
            title="Cerrar modal"
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles['modal-body']}>
          {title && <h3>{title}</h3>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
