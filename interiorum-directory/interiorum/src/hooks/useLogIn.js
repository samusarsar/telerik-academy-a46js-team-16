const useLogIn = ({ states, from, onClose }) => {
    states.setUsernameError(states.username !== states.user.username);
    states.setPasswordError(states.password !== states.user.password);
    if (states.username === states.user.username && states.password === states.user.password) {
        states.status.setLoginState(true);
        onClose ? onClose() : states.navigate(from, { replace: true });
        states.toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    }
};

export default useLogIn;
