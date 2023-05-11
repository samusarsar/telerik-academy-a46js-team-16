import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const BlockedAlert = ({ text }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{text}</AlertTitle>
        </Alert>
    );
};


BlockedAlert.propTypes = {
    text: PropTypes.string,
};

export default BlockedAlert;
