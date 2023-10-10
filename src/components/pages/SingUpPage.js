import { useDispatch } from 'react-redux'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import { useHttps } from '../../hooks/http.hook';
import { setUser } from './formSlice'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './formPage.scss'

const SingUpPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {request} = useHttps()
    
    const hanadleSingUp = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
            

            request(`http://localhost:3001/email`, 'POST', JSON.stringify({
                id: user.uid,
                posts: []
            }))

            return navigate("/profile");
        })
        .catch(console.error)
    }

    return (
        <>
        <Helmet>
            <title>Mag Magazine - Sing up</title>
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
                                hanadleSingUp(values.email, values.password, values.name)
                            }}
                        >
                            <Form className='form-section-form'>
                                <Field className='form-section-input' id='email' name='email' type='text'/>
                                <ErrorMessage className='form-section-error' name='email' component='div'/>
                                <Field className='form-section-input' id='password' name='password' type='password'/>
                                <button type="submit" className='form-section-btn'>Sing Up</button>
                                <span className="form-section-redirection">You have an accont? Log in <Link to='/login' className='form-section-link'>here</Link></span>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SingUpPage