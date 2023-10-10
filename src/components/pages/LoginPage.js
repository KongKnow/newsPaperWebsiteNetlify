import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import { setUser } from './formSlice'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './formPage.scss'

const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const hanadleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            console.log(user)
            localStorage.setItem('userEmail', user.email)
            localStorage.setItem('userUid', user.uid)
            localStorage.setItem('userToken', user.accessToken)
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }))

            return navigate("/profile");
        })
        .catch(console.error)
    }

    return (
        <>
        <Helmet>
            <title>Mag Magazine - Log in</title>
        </Helmet>
            <Header/>
            <div className="form-section">
                <div className="container">
                    <div className="form-section-inner">
                        <Formik

                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string().email('Enter an email, please!').required('You shoud enter your email!')
                            })}
                            onSubmit={values => {
                                hanadleLogin(values.email, values.password)
                            }}
                        >
                            <Form className='form-section-form'>
                                <Field className='form-section-input' id='email' name='email' type='text'/>
                                <ErrorMessage className='form-section-error' name='email' component='div'/>
                                <Field className='form-section-input' id='password' name='password' type='password'/>
                                <button type="submit" className='form-section-btn'>Log In</button>
                                <span className="form-section-redirection">Stll don't have an accont? Create it <Link to='/singup' className='form-section-link'>here</Link></span>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default LoginPage