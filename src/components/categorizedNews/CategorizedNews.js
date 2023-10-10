import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { categorizedNewsThunk } from './categorizedNewsSlice'
import { changeCategory } from './categorizedNewsSlice'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import './categorizedNews.scss'

const CategorizedNews = () => {

    const news = useSelector(state => state.categorizedNews.categorizedNews)
    const status = useSelector(state => state.categorizedNews.categorizedNewsProcess)
    const category = useSelector(state => state.categorizedNews.category)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(categorizedNewsThunk(category))
    }, [category])

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
                <div className="categorized-news-post" key={post.id}>
                    <Link to={`/${post.id}`}
                    onClick={() => onSinglePage(post)}
                    className="categorized-news-title">{post.title}</Link>
                    <Link to={`/${post.id}`} 
                    onClick={() => onSinglePage(post)}
                    className="categorized-news-img"><img src={post.image} alt="" /></Link>
                    <p className="categorized-news-description">{text}</p>                    
                </div>
            )
        })

        return posts
    }

    const onCategory = (e) => {
        e.target.parentElement.childNodes.forEach(button => {
            button.classList.remove('active')
        })
        e.target.classList.add('active')
        dispatch(changeCategory(e.target.getAttribute('data-category')))
    }

    const renderedPosts = renderPosts(news)

    const loadingNews =  status === 'loading' ? <Spinner/> : null
    const fulfilledNews = status === 'success' ? renderedPosts : null
    const rejectedNews = status === 'error' ? <Error/> : null

    return (
        <div className="categorized-news-inner">
            <div className="categorized-news-categories">
                <button onClick={(e) => onCategory(e)} className="categorized-news-category" data-category='financial'>FINANCIAL WORLD</button>
                <button onClick={(e) => onCategory(e)} className="categorized-news-category" data-category='sport'>SPORTS WORLD</button>
                <button onClick={(e) => onCategory(e)} className="categorized-news-category" data-category='celebrity'>PROMI WORLD</button>
                <button onClick={(e) => onCategory(e)} className="categorized-news-category" data-category='art'>MUSIC & ARTS WORLD</button>
            </div>
            <div className="categorized-news-list">
                {loadingNews}
                {fulfilledNews}
                {rejectedNews}
            </div>
        </div>
    )
}

export default CategorizedNews