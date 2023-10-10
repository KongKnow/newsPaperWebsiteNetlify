import './sectionWrapper.scss'
import SortedNews from '../sortedNews/SortedNews'
import CategorizedNews from '../categorizedNews/CategorizedNews'
import Advertisement from '../advertisement/Advertisement'
import Categories from '../categories/Categories'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { sortedNewsLatestThunk, sortedNewsPopularThunk } from '../sortedNews/sortedNewsSlice'

const SectionWrapper = () => {

    const latestNews = useSelector(state => state.sortedNews.sortedNewsLatest)
    const popularNews = useSelector(state => state.sortedNews.sortedNewsPopular)
    const latestNewsStatus = useSelector(state => state.sortedNews.sortedNewsLatestProcess)
    const popularNewsStatus = useSelector(state => state.sortedNews.sortedNewsPopularProcess)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sortedNewsLatestThunk())
        dispatch(sortedNewsPopularThunk())
    }, [])

    return (
        <div className="section-wrapper">
            <div className="container">
                <div className="section-wrapper-inner">
                    <div className="news">
                        <div className="sorted-news">
                            <SortedNews title={'LATEST NEWS'} data={latestNews} status={latestNewsStatus}/>
                            <SortedNews title={'POPULAR NEWS'} data={popularNews} status={popularNewsStatus}/>
                        </div>
                        <div className="categoried-news">
                            <CategorizedNews/>
                        </div>
                    </div>
                    <div className="advertisement">
                        <Advertisement/>
                    </div>
                    <div className="categories">
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionWrapper