import {useSelector} from 'react-redux'

const useAuth = () => {
    const {email, token, id} = useSelector(state => state.form)

    return {
        isAuth: !!email,
        email,
        token,
        id
    }
}

export {useAuth}