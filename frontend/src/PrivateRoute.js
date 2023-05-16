import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

const Private = ({ Component }) => {
    const { loggedIn } = useContext(AuthContext)

    return loggedIn ? <Component /> : <Navigate to="/userLogin" />
}

export default Private;

