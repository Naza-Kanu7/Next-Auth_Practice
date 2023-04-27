import Head from "next/head";
import Layout from "../../layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Image from "next/image";
import { HiAtSymbol } from "react-icons/hi";
import { HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik } from "formik";
import login_validate from "../../lib/validate";
import { useRouter } from "next/router";

export default function Login () {

    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate:login_validate,
        onSubmit
    })

    console.log(formik.errors)

    async function onSubmit(values) {
        console.log(values)
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl : '/'
        })
        console.log(status)
        if(status.ok) router.push(status.url)

    }

    // Google Login Handler Function

    async function handleGoogleLogin() {
        signIn("google", {callbackUrl : 'http://localhost:3000'})
    }

    // Github Login Handler Function

    async function handleGithubLogin() {
        signIn("github", {callbackUrl : 'http://localhost:3000'})
    }

    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <section className="W-3/5 mx-auto flex flex-col gap-10">
                {/* title */}
                <div className="title">
                    <h1 className="text-gray-800 text-3xl font-bold py-4">Explore</h1>
                    <p className="w-3/4 mx-auto text-gray-400">Generates passages of lorem ipsum text suitable for use as</p>
                </div>
                {/* form */}
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

                    {/* EMAIL INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            className={styles.input_text}
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            {...formik.getFieldProps('email')}
                        />
                        <span className="icon flex items-center px-4"><HiAtSymbol size={20} /></span>
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>} */}

                    {/* PASSWORD INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${showPassword ? 'text' : 'password'}`} 
                            name="password" 
                            placeholder="Password" 
                            className={styles.input_text} 
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            {...formik.getFieldProps('password')}
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShowPassword(!showPassword)}><HiFingerPrint size={20} /></span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>} */}


                    {/* login buttons */}
                    <div className="input-button">
                        <button className={styles.button} type="submit">Login</button>
                    </div>

                    {/* LOGIN WITH GOOGLE */}
                    <div className="input-button">
                        <button className={styles.button_custom} type="button" onClick={handleGoogleLogin}>
                            Sign In with Google
                            <Image src={'/assets/google.svg'} alt='google icon' width='20' height={20}></Image>
                        </button>
                    </div>

                    {/* LOGIN WITH GOOGLE */}
                    <div className="input-button">
                        <button className={styles.button_custom} type="button" onClick={handleGithubLogin}>
                            Sign In with Github
                            <Image src={'/assets/github.svg'} alt='github icon' width='25' height={25}></Image>
                        </button>
                    </div>
                </form>

                {/* bottom */}
                <p className="text-center text-gray-400">Dont have an account? <Link href={'/register'}><span className="text-blue-700">Sign Up</span></Link></p>
            </section>
        </Layout>
    )
}