import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const useLogInStates = () => {
    const { setContext } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const [show, setShow] = useState(false);

    return {
        setContext,
        email,
        setEmail,
        emailError,
        setEmailError,
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
