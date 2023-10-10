import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listNewsThunk } from './listNewsSlice'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import Header from "../header/Header"
import Footer from "../footer/Footer"
import './listNewsPage.scss'

const ListNewsPage = () => {
    const news = useSelector(state => state.listNews.listNews)
    const status = useSelector(state => state.listNews.listNewsProcess)
    const category = useSelector(state => state.listNews.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listNewsThunk(category))
    }, [])

    const onSinglePage = (data) => {
        localStorage.setItem('singlePageTitle', data.title)
        localStorage.setItem('singlePageImage', data.image)
        localStorage.setItem('singlePageDescr', data.text)
        localStorage.setItem('singlePageAuthor', data.author)
    }

    const renderPosts = (arr) => {
        const posts = arr.map(post => {
            let text
            if (post.text.split(' ').length > 20) {
                text = post.text.split(' ').slice(0, 21).join(' ')
                text += '...'
            }
            return (
                <div className="list-news-post" key={post.id}>
                    <Link to={`/${post.id}`} onClick={() => onSinglePage(post)} className="list-news-img"><img src={post.image} alt="" /></Link>
                    <div className="list-news-content">
                        <Link to={`/${post.id}`} onClick={() => onSinglePage(post)} className="list-news-title">{post.title}</Link>
                        <p className="list-news-description">{text}</p>
                    </div>
                </div>
            )
        })

        return posts
    }


    const renderedPosts = renderPosts(news)

    const loadingNews =  status === 'loading' ? <Spinner/> : null
    const fulfilledNews = status === 'success' ? renderedPosts : null
    const rejectedNews = status === 'error' ? <Error/> : null

    return (
        <>
        <Helmet>
            <title>Mag Magazine - Category: {category}</title>
        </Helmet>
            <Header/>
                <div className="list-news">
                    <div className="container">
                        <div className="list-news-inner">
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

export default ListNewsPage