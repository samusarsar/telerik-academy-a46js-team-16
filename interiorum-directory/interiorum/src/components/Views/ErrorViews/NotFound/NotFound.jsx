import { Heading, Text } from '@chakra-ui/react';
import ErrorBase from '../ErrorBase';

const NotFound = () => {
    return (
        <ErrorBase>
            <Heading as='h1' size='2xl' p={6}>404 Page Not Found</Heading>
            <Text>Hmm... looks like the page you are trying to access doesn&apos;t exist... That&apos;s okay, though! </Text>
            <Text>Why don&apos;t you head back to the home page and browse Interiorum from there? Or go ahead and log in or sign up!</Text>
        </ErrorBase>
    );
};

export default NotFound;
