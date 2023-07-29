import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    
    if (token) {
        const decoded = jwtDecode(token)
        console.log(decoded)
        const { username } = decoded.UserInfo

        return decoded.UserInfo 
    } return {username: ''}
}

export default useAuth