import error from '../../assets/error.png'

const Error = () => {
    return (
        <div className="error-img" style={{display: 'flex', justifyContent: 'center'}}>
            <img src={error} alt="" style={{width: '50%'}}/>
        </div>
    )
}

export default Error