import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Market App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Market App
        </h1>

        <p className={styles.description}>
          Get started by Login first!
        </p>

        <div className={styles.grid}>
          <button onClick={() => {
            router.push("/user/login")
          }} className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Account Login</p>
          </button>

          <button onClick={() => {
            router.push("/user/register")
          }} className={styles.card}>
            <h2>Signup &rarr;</h2>
            <p>Don't have an account?</p>
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
          Powered by{' '}
          <span className={styles.logo}>
            Erwin Wiguna
          </span>
      </footer>
    </div>
  )
}