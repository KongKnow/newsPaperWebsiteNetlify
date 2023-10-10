import { useDispatch } from 'react-redux'
import { changeCountry } from './headerSlice'

const HeaderNav = () => {
    const dispatch = useDispatch()

    const onCountry = (e) => {
        e.target.parentElement.childNodes.forEach(button => {
            button.classList.remove('active')
        })
        e.target.classList.add('active')
        dispatch(changeCountry(e.target.textContent))
    }

    return (
        <nav className="header-nav">
            <div className="container">
                <div className="header-nav-inner">
                    <button onClick={(e) => onCountry(e)} className="header-nav-link active">world</button>
                    <button onClick={(e) => onCountry(e)} className="header-nav-link">usa</button>
                    <button onClick={(e) => onCountry(e)} className="header-nav-link">england</button>
                    <button onClick={(e) => onCountry(e)} className="header-nav-link">germany</button>
                </div>
            </div>                
        </nav>
    )
}

export default HeaderNav