import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styles from '../../styles/Login.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const isServer = () => typeof window === 'undefined'
const setCookies = async(ctx) => {
  if(isServer()) {
    setTimeout(() => {
      
    }, 500);
    return ctx.req.cookies.token
  }
}

const Register = (token) => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    file: Yup.string()
              .required('Image is required'),
  })  

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState

  function onSubmit(data) {
    return uploadProduct(data);
  }

  async function uploadProduct(value) {
    let config = {
      method: 'post',
      url: 'http://localhost:4000/api/products/upload',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      },
      data: value,
    };

    try {
      const response = await axios(config);
      if (response.status == 201) {
        reset();
        router.push("/dashboard")
      }
    } catch (err) {}
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Market App</title>
        <meta name="description" content="Add new product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Product
        </h1>

        <p className={styles.description}>
          Add new product
        </p>

        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="file" type="file" {...register('file')} className={`form-control ${errors.file ? styles.isinvalid : ''}`} placeholder="File Image"/>
            <div className={styles.invalidfeedback}>{errors.file?.message}</div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-1">Upload</button>
            </div>
          </form>
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
export default Register

Register.getInitialProps = async(ctx) => {
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