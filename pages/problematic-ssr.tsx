import type { GetServerSideProps } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import * as problematicClient from '../services/api-client/problematic-client'
import Cookies from 'cookies'
import { nanoid } from 'nanoid'

type Props = {
  pendingMessages: string[]
}

function Page({pendingMessages}: Props) {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count +1)

  const handleClick = async () => {
    problematicClient.chat(`hi ${count}`);
    increment()
  }
  return (
    <div className={styles.container}>
      <div>Pending messages:</div>
      <ul>
        {
          pendingMessages.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))
        }
      </ul>
      <button onClick={handleClick}>{`Say Hello ${count}`}</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const cookies = new Cookies(req, res)
  const userId = cookies.get('user_id')
  if (!userId) {
    cookies.set('user_id', nanoid(4))
  }
  const pendingMessages = await problematicClient.chat(`hello from ssr to ${userId}`)
  return {
    props: {
      pendingMessages
    }
  }
}

export default Page
