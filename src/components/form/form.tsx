import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './Form.module.scss'
import { initFirebase } from '@/firebase/clientApp'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { Channel } from '@/types/channel'

const db = getFirestore(initFirebase())

export default function Form() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Channel>()
  const onSubmit: SubmitHandler<Channel> = data => sendData(data)

  const sendData = async (data: Channel) => {
    try {
      await addDoc(collection(db, 'channels'), {
        ...data,
      })
      reset()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre</label>
      <input {...register('name', { required: true })} />
      {errors.id && <span>El nombre es requerido</span>}
      <label>ID del Canal</label>
      <input {...register('id', { required: true })} />
      {errors.id && <span>El ID es requerido</span>}
      <label>URL del Canal</label>
      <select
        {...register('type', { required: true })}
        placeholder="Selecciona el tipo de Canal"
      >
        <option value="TV">TV</option>
        <option value="Radio">Radio</option>
      </select>
      {errors.id && <span>El tipo de canal es requerido</span>}
      <button type="submit">Enviar</button>
    </form>
  )
}
