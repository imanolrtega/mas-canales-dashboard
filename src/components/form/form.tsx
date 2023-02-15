import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './Form.module.scss'
import { initFirebase } from '@/firebase/clientApp'
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { Channel } from '@/types/channel'
import { MouseEvent, useEffect } from 'react'

const db = getFirestore(initFirebase())

type Form = {
  channelToEdit: Channel
  editChannel: boolean
  setEditChannel: (value: boolean) => void
  setChannelToEdit: (value: Channel) => void
}

export default function Form({
  channelToEdit,
  editChannel,
  setEditChannel,
  setChannelToEdit,
}: Form) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<Channel>({ defaultValues: channelToEdit })
  const onSubmit: SubmitHandler<Channel> = data => sendData(data)

  const sendData = async (data: Channel) => {
    const formData = {
      ...data,
      favorite: false,
    }
    try {
      if (editChannel && channelToEdit) {
        await setDoc(doc(db, 'channels', channelToEdit.docId), formData)
        setEditChannel(false)
        setChannelToEdit({} as Channel)
      } else {
        await addDoc(collection(db, 'channels'), formData)
      }
      reset()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleCancelBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editChannel && channelToEdit) {
      setEditChannel(false)
      setChannelToEdit({} as Channel)
    }
    setValue('name', '')
    setValue('id', '')
    setValue('type', '')
  }

  useEffect(() => {
    if (editChannel && channelToEdit) {
      setValue('name', channelToEdit.name)
      setValue('id', channelToEdit.id)
      setValue('type', channelToEdit.type)
    }
  }, [channelToEdit, editChannel, setValue])

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nombre</label>
      <input
        {...register('name', {
          required: true,
        })}
      />
      {errors.name && <span>El nombre es requerido</span>}
      <label htmlFor="id">ID del Canal</label>
      <input {...register('id', { required: true })} />
      {errors.id && <span>El ID es requerido</span>}
      <label htmlFor="type">Tipo Canal</label>
      <select {...register('type', { required: true })}>
        <option value="" disabled selected>
          Seleccione el tipo
        </option>
        <option value="TV">TV</option>
        <option value="Radio">Radio</option>
      </select>
      {errors.type && <span>El tipo de canal es requerido</span>}
      <div className={styles['buttons']}>
        <button
          className={`${editChannel ? styles['edit-btn'] : ''}`}
          type="submit"
        >
          {editChannel ? 'Editar' : 'Agregar'}
        </button>
        <button onClick={e => handleCancelBtn(e)}>Cancelar</button>
      </div>
    </form>
  )
}
