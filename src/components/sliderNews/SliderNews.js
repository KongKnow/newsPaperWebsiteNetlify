import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import { sliderNewsThunk } from './sliderNewsSlice'
import './sliderNews.scss'

const SliderNews = () => {

    const news = useSelector(state => state.sliderNews.sliderNews)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sliderNewsThunk())
    }, [])

    const onSinglePage = (data) => {
        localStorage.setItem('singlePageTitle', data.title)
        localStorage.setItem('singlePageImage', data.image)
        localStorage.setItem('singlePageDescr', data.text)
        localStorage.setItem('singlePageAuthor', data.author)
    }

    const renderPosts = (arr) => {
        const posts = arr.map(post => {
            return (
                <div className="slider-news-post" key={post.id}>
                    <time className="slider-news-author">{post.author}</time>
                    <Link to={`/${post.id}`} onClick={() => onSinglePage(post)} href='#' className="slider-news-title">{post.title}</Link>
                </div>
            )
        })

        return posts
    }

    const renderedPosts = renderPosts(news)

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      }
    return (
        <div className="slider-news">
            <div className="container">
                <div className="slider-news-inner">
                    <Slider {...settings}>
                        {renderedPosts}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default SliderNews