import { useEffect, useCallback} from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Helmet from 'react-helmet'
import { profilePageThunk } from "./ProfilePageSlice"
import { removeUser } from "./formSlice"
import { useHttps } from "../../hooks/http.hook"
import {useAuth} from '../../hooks/useAuth'
import Header from "../header/Header"
import Footer from "../footer/Footer"
import Error from "../error/Error"
import Spinner from "../spinner/Spinner"
import bookmark from '../../assets/bookmark.svg'
import './profilePage.scss'

const ProfilePage = () => {

    const readLaterNews = useSelector(state => state.profile.profilePageNews)
    const status = useSelector(state => state.profile.profilePageProcess)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {request} = useHttps()
    const {isAuth, id} = useAuth()

    useEffect(() => {
        if(!localStorage.getItem('userEmail')) {
            return navigate("/login");
        } 
            
        dispatch(profilePageThunk(localStorage.getItem('userUid')))
        
    }, [])

    useEffect(() => {

    }, [readLaterNews])
    
    const onRemoveReadLater = async (newsId) => {
        await request(`http://localhost:3001/email/${id}`).then(res => {
            const arr = res.posts
            return arr.filter(post => newsId !== post.id)
                
        }).then(res => {
            request(`http://localhost:3001/email/${id}`, 'PATCH', JSON.stringify({
                posts: [...res]
            }))
        })
        

        dispatch(profilePageThunk(id))
    }

    const onSinglePage = (data) => {
        localStorage.setItem('singlePageTitle', data.title)
        localStorage.setItem('singlePageImage', data.image)
        localStorage.setItem('singlePageDescr', data.descr)
        localStorage.setItem('singlePageAuthor', data.author)
    }

    const renderPosts = (arr) => {
        const posts = arr.map(post => {
            let text
            if (post.descr.split(' ').length > 20) {
                text = post.descr.split(' ').slice(0, 21).join(' ')
                text += '...'
            }
            return (
                <div className="profile-section-post" key={post.id}>
                    <Link to={`/${post.id}`} onClick={() => onSinglePage(post)} className="profile-section-img"><img src={post.image} alt="" /></Link>
                    <div className="profile-section-content">
                        <Link to={`/${post.id}`} onClick={() => onSinglePage(post)} className="profile-section-title">{post.title}</Link>
                        <p className="profile-section-description">{text}</p>
                        <div className="single-post-bookmark" onClick={(e) => onRemoveReadLater(post.id)} ><img src={bookmark} alt="read later" /></div>
                    </div>
                </div>
            )
        })

        return posts
    }

    const renderedPosts = renderPosts(readLaterNews)

    const loadingNews =  status === 'loading' ? <Spinner/> : null
    const fulfilledNews = status === 'success' ? renderedPosts : null
    const rejectedNews = status === 'error' ? <Error/> : null

    return (
        <>
        <Helmet>
            <title>Mag Magazine - Your profile</title>
        </Helmet>
            <Header/>
                <div className="profile-section">
                    <div className="container">
                        <div className="profile-section-inner">
                            Welcome to your profile
                        </div>

                        <div onClick={() => {
                            dispatch(removeUser())
                            return navigate("/login");
                        }} className="logout-btn">Log Out</div>
                        <div className="profile-section-posts">
                            {loadingNews}
                            {fulfilledNews}
                            {rejectedNews}
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}

export  default ProfilePage