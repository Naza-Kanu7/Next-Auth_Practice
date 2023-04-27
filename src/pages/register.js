import Head from "next/head";
import Layout from "../../layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css'
import Image from "next/image";
import { HiAtSymbol } from "react-icons/hi";
import { HiFingerPrint } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { register_validate } from "../../lib/validate";
import { useRouter } from "next/router";

export default function Register () {

    const [showPassword, setShowPassword] = useState({password:false, cpassword:false})
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: register_validate,
        onSubmit
    })

    console.log(formik.errors)

    async function onSubmit(values) {
        console.log(values)
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            })
    }

    return (
        <Layout>
            <Head>
                <title>Register Page</title>
            </Head>
            <section className="W-3/5 mx-auto flex flex-col gap-10">
                {/* title */}
                <div className="title">
                    <h1 className="text-gray-800 text-3xl font-bold py-4">Register</h1>
                    <p className="w-3/4 mx-auto text-gray-400">Generates passages of lorem ipsum text suitable for use as</p>
                </div>
                {/* form */}
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

                    {/* USERNAME INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : '' }`}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            className={styles.input_text}
                            {...formik.getFieldProps('username')}
                        />
                        <span className="icon flex items-center px-4"><HiOutlineUser size={20} /></span>
                    </div>
                    {/* {formik.errors.username && formik.touched.username ? <span className="text-rose-500">{formik.errors.username}</span> : <></>} */}

                    {/* EMAIL INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            className={styles.input_text}
                            {...formik.getFieldProps('email')}
                        />
                        <span className="icon flex items-center px-4"><HiAtSymbol size={20} /></span>
                    </div>
                    {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>} */}

                    {/* PASSWORD INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${showPassword.password ? 'text' : 'password'}`} 
                            name="password" 
                            placeholder="Password" 
                            className={styles.input_text} 
                            {...formik.getFieldProps('password')}
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShowPassword({...showPassword, password:!showPassword.password})}><HiFingerPrint size={20} /></span>
                    </div>
                    {/* {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>} */}

                    {/* CONFIRM PASSWORD INPUT FIELD */}
                    <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                        <input 
                            type={`${showPassword.cpassword ? 'text' : 'password'}`} 
                            name="cpassword" 
                            placeholder="Confirm Password" 
                            className={styles.input_text} 
                            {...formik.getFieldProps('cpassword')}
                        />
                        <span className="icon flex items-center px-4" onClick={() => setShowPassword({...showPassword, cpassword:!showPassword.cpassword})}><HiFingerPrint size={20} /></span>
                    </div>
                    {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className="text-rose-500">{formik.errors.cpassword}</span> : <></>} */}

                    {/* sign up button */}
                    <div className="input-button">
                        <button className={styles.button} type="submit">Sign Up</button>
                    </div>
                </form>

                {/* bottom */}
                <p className="text-center text-gray-400">Have an account? <Link href={'/login'}><span className="text-blue-700">Sign In</span></Link></p>
            </section>
        </Layout>
    )
}