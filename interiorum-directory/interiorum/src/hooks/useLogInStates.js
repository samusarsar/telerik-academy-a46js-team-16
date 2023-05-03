import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext/AppContext';
import { UserContext } from '../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const useLogInStates = () => {
    const status = useContext(AppContext);
    const user = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const [show, setShow] = useState(false);

    return {
        status,
        user,
        username,
        setUsername,
        usernameError,
        setUsernameError,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        navigate,
        toast,
        show,
        setShow,
    };
};

export default useLogInStates;
