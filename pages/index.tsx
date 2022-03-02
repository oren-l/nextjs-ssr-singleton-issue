import Link from "next/link"
import styles from '../styles/Home.module.css'

function Page() {
    return (
        <div className={styles.container}>
            <h1>hello</h1>
            <hr />
            <nav>
                <ul>
                    <li>
                        <Link href={'/problematic-ssr'}>problematic-ssr</Link>
                    </li>
                    <li>
                        <Link href={'/fixed-ssr'}>fixed-ssr</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Page