const useLogOut = ({ status, onClose, navigate, toast }) => {
    status.setLoginState(false);
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
};

export default useLogOut;
