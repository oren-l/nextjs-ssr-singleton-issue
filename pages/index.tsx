import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { chat } from '../utils/client'

const Home: NextPage = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count +1)

  const handleClick = async () => {
    chat(`hi ${count}`);
    increment()
  }
  return (
    <div className={styles.container}>
      
      <button onClick={handleClick}>{`Say Hello ${count}`}</button>
    </div>
  )
}

export default Home
