import { memo } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeCategory } from '../pages/listNewsSlice'
import './categories.scss'

const Categories = memo(() => {

    const category = useSelector(state => state.listNews.category)
    const dispatch = useDispatch()

    const onCategory = (e) => {
        dispatch(changeCategory(e.target.textContent.toLowerCase().slice(3)))
    }

    return (
        <div className="categories-inner">
            <div className="categories-title">Categories</div>
            <ul className="categories-list">
                <li className="categories-item">
                    <Link to={`/category/${category}`} onClick={(e) => onCategory(e)} className="categories-link">&gt;&gt; Finance</Link>
                </li>
                <li className="categories-item">
                    <Link to={`/category/${category}`} onClick={(e) => onCategory(e)} className="categories-link">&gt;&gt; Enterprise</Link>
                </li>
                <li className="categories-item">
                    <Link to={`/category/${category}`} onClick={(e) => onCategory(e)} className="categories-link">&gt;&gt; Sport</Link>
                </li>
                <li className="categories-item">
                    <Link to={`/category/${category}`} onClick={(e) => onCategory(e)} className="categories-link">&gt;&gt; Art</Link>
                </li>
                <li className="categories-item">
                    <Link to={`/category/${category}`} onClick={(e) => onCategory(e)} className="categories-link">&gt;&gt; Celebrities</Link>
                </li>
            </ul>
        </div>
    )
})

export default Categories