import { Button, Divider, HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../Home/HomeHeader';
import { BRAND_COLOR_2 } from '../../../common/constants';

const ErrorBase = ({ children }) => {
    const navigate = useNavigate();

    return (
        <VStack minH='100vh' minW='100%'>
            <HomeHeader />
            <VStack p={2} gap={2}>
                <VStack gap={2}>
                    {children}
                </VStack>
                <HStack h='100px' gap={6}>
                    <Button colorScheme='orange' onClick={() => navigate('home')}>Go to Home</Button>
                    <Divider orientation='vertical' borderColor={BRAND_COLOR_2} />
                    <VStack>
                        <Button colorScheme='telegram' w='100%' onClick={() => navigate('log-in')}>Log In</Button>
                        <Button colorScheme='orange' variant='outline' w='100%' onClick={() => navigate('sign-up')}>Sign Up</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default ErrorBase;
