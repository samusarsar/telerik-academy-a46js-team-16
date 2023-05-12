import { Heading, Text } from '@chakra-ui/react';
import ErrorBase from '../ErrorBase';

const ServerDown = () => {
    return (
        <ErrorBase>
            <Heading as='h1' size='2xl' p={6}>Server Error</Heading>
            <Text>Oh-no! Looks like our server is currently down... Please try again a bit later! </Text>
            <Text>In a bit you can head back to the home page and browse Interiorum from there? Or go ahead and log in or sign up!</Text>
        </ErrorBase>
    );
};

export default ServerDown;
