import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const BlockedAlert = ({ text }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{text}</AlertTitle>
        </Alert>
    );
};

export default BlockedAlert;
