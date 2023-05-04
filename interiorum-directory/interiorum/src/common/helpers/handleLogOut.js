import { logoutUser } from '../../services/auth.service';

const handleLogOut = ({ setContext, onClose, navigate, toast }) => {
    logoutUser()
        .then(() => {
            setContext({
                user: null,
                userData: null,
            });
        })
        .then(() => {
            if (onClose) onClose();
            navigate('../home');
            toast({
                title: 'See you soon!',
                description: 'You have successfully logged out.',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            });
        });
};

export default handleLogOut;
