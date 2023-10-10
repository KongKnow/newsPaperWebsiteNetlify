import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import './sortedNews.scss'

const SortedNews = (props) => {

    const onSinglePage = (data) => {
        localStorage.setItem('singlePageTitle', data.title)
        localStorage.setItem('singlePageImage', data.image)
        localStorage.setItem('singlePageDescr', data.text)
        localStorage.setItem('singlePageAuthor', data.author)
    }

    const renderPosts = (arr) => {
        const posts = arr.map(post => {
            let text
            if (post.text.length > 113) {
                text = post.text.slice(0, 114)
                text += '...'
            }
            return (
                <div className="sorted-news-post" key={post.id}>
                    <Link to={`/${post.id}`} 
                    onClick={() => onSinglePage(post)} 
                    className="sorted-news-img"><img src={post.image} alt="" /></Link>
                    <div className="sorted-news-content">
                        <Link to={`/${post.id}`} 
                        onClick={() => onSinglePage(post)}
                        className="sorted-news-title">{post.title}</Link>
                        <p className="sorted-news-description">{text}</p>
                        <Link to={`/${post.id}`} 
                        onClick={() => onSinglePage(post)} 
                        className="sorted-news-link">Read more &gt;&gt;</Link>
                    </div>
                </div>
            )
        })

        return posts
    }

    const renderedPosts = renderPosts(props.data)

    const loadingNews =  props.status === 'loading' ? <Spinner/> : null
    const fulfilledNews = props.status === 'success' ? renderedPosts : null
    const rejectedNews = props.status === 'error' ? <Error/> : null

    return (
        <div className="sorted-news-inner">
            <div className="sorted-news-name">{props.title}</div>
            {loadingNews}
            {fulfilledNews}
            {rejectedNews}
        </div>
    )
}

export default SortedNews

