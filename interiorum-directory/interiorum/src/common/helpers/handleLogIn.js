import { loginUser } from '../../services/auth.service';

const handleLogIn = ({ states, from, onClose }) => {
    if (!states.email.includes('@')) {
        states.setEmailError('Email is invalid.');
        states.setEmailError(false);
    }

    loginUser(states.email, states.password)
        .then(credential =>
            states.setContext({
                user: credential.user,
            }))
        .then(() => {
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
            states.setEmailError(false);
            states.setPasswordError(false);
        })
        .catch(e => {
            switch (e.message) {
            case 'Firebase: Error (auth/user-not-found).':
                states.setEmailError('Email does not exist.');
                states.setPasswordError(false);
                break;
            case 'Firebase: Error (auth/wrong-password).':
                states.setPasswordError(true);
                states.setEmailError(false);
                break;
            };
            console.log(e.message);
        });
};

export default handleLogIn;
