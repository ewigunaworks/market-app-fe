import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../styles/Dashboard.module.css'
import cookie from 'js-cookie'
import axios from 'axios';

const isServer = () => typeof window === 'undefined'
const setCookies = async(ctx) => {
  if(isServer()) {
    setTimeout(() => {
      
    }, 500);
    return ctx.req.cookies.token
  }
}

export default function Dashboard(props) {
  const router = useRouter();

  async function getUserDetail(token) {
    let config = {
      method: 'get',
      url: 'http://localhost:4000/api/users/detail',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      },
    };
  
    try {
      const response = await axios(config);
      if (response.status == 200) {
        return response.data.name
      }
    } catch (err) {}
  }
  
  let username = ''
  getUserDetail(props.props.token).then(value => username = value)

  return (
    <div className={styles.container}>
      <Head>
  <title>Market App {username}</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.rowlogout}>
          <button onClick={() => {
            cookie.remove("token");
            router.push("/user/login")
          }} className={styles.card}>
            <p>Logout &rarr;</p>
          </button>
        </div>
        <h6 className={styles.title}>Welcome to Market App, {username}</h6>

        <div className={styles.rownew}>
          <button onClick={() => {
            router.push("/product/add")
          }} className={styles.card}>
            <p>New Product &oplus;</p>
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

Dashboard.getInitialProps = async(ctx) => {
  if(isServer()) {
    setTimeout(function(){}, 300)  
  }
  
  let cookie = await setCookies(ctx)
  return {
    props: {
      token: cookie || "",
    }
  }
}