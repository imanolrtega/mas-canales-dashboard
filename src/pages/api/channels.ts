import { initFirebase } from '@/firebase/clientApp'
import { Channel } from '@/types/channel'
import { collection, getDocs, getFirestore } from '@firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  channels: Channel[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const db = getFirestore(initFirebase())
  const querySnapshot = await getDocs(collection(db, 'channels'))
  const channels = [] as Channel[]
  querySnapshot.forEach(doc => {
    channels.push({ ...doc.data(), docId: doc.id } as Channel)
  })

  if (req.method === 'GET') {
    res.status(200).json({ channels })
  } else {
    res.status(405).end()
  }
}
