import { useNavigate } from "react-router-dom"
import Helmet from 'react-helmet'
import { useHttps } from "../../hooks/http.hook"
import {useAuth} from '../../hooks/useAuth'
import Header from "../header/Header"
import Footer from "../footer/Footer"
import bookmark from '../../assets/bookmark.svg'
import './singleNewsPage.scss'

const SingleNewsPage = () => {

    const navigate = useNavigate()
    const {request} = useHttps()
    const {isAuth, id} = useAuth()

    const postInfo = {
        title: localStorage.getItem('singlePageTitle').toLocaleUpperCase(),
        author: localStorage.getItem('singlePageAuthor'),
        image: localStorage.getItem('singlePageImage'),
        descr: localStorage.getItem('singlePageDescr'),
        id: localStorage.getItem('singlePageId')
    }

    const onReadLater = () => {
        if(!isAuth) {
            return navigate("/login");
        } else {
            request(`http://localhost:3001/email/${id}`).then(res => {
                if (res.posts.length > 0) {
                    if (res.posts.every(post => post.id !== postInfo.id)) {
                        res.posts.push({
                            ...postInfo
                        })
                    }
                } else {
                    res.posts.push({
                        ...postInfo
                    })
                }
                

                return res
            }).then(res => {
                request(`http://localhost:3001/email/${id}`, 'PATCH', JSON.stringify({
                    posts: [...res.posts]
                }))
            })
        }

    }

    return (
        <>
        <Helmet>
            <title>Mag Magazine - {postInfo.title}</title>
        </Helmet>
            <Header/>
                <div className="single-post">
                    <div className="container">
                        <div className="single-post-inner">
                            <h2 className="single-post-title">{postInfo.title}</h2>
                            <span className="single-post-author">Author: {postInfo.author}</span>
                            <div className="single-post-bookmark" onClick={onReadLater}><img src={bookmark} alt="read later" /></div>
                            <div className="single-post-img"><img src={postInfo.image} alt="" /></div>
                            <p className="single-post-description">{postInfo.descr}</p>
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default SingleNewsPage