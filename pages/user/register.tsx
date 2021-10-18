import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styles from '../../styles/Login.module.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Home from '..'

const Register= () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
              .required('Username is required'),
    name: Yup.string()
              .required('Name is required'),
    password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Password is required'),
    confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),

  })  

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, reset, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState

  function onSubmit(data) {
    return loginUser(data);
  }

  async function loginUser(value) {
    let config = {
      method: 'post',
      url: 'http://localhost:4000/api/auth/register',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: value,
    };

    try {
      const response = await axios(config);
      if (response.status == 201) {
        reset();
        router.push("/user/login")
      }
    } catch (err) {}
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Market App</title>
        <meta name="description" content="Register User Market App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Signup
        </h1>

        <p className={styles.description}>
          Register your account
        </p>

        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? styles.isinvalid : ''}`} placeholder="Username"/>
            <div className={styles.invalidfeedback}>{errors.username?.message}</div>

            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? styles.isinvalid : ''}`} placeholder="Name"/>
            <div className={styles.invalidfeedback}>{errors.name?.message}</div>

            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? styles.isinvalid : ''}`} placeholder="Password" />
            <div className={styles.invalidfeedback}>{errors.password?.message}</div>

            <input name="password" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? styles.isinvalid : ''}`} placeholder="Confirm Password" />
            <div className={styles.invalidfeedback}>{errors.confirmPassword?.message}</div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-1">Register</button>
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