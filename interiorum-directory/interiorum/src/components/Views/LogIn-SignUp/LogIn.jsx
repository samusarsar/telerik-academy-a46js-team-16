import { FormControl, FormLabel, Input, FormErrorMessage, Box, Heading, Text, Button, HStack, VStack, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import useLogIn from '../../../hooks/useLogIn';
import useLogInStates from '../../../hooks/useLogInStates';

const LogIn = () => {
    const states = useLogInStates();

    const location = useLocation();
    const from = location.state?.from || '/';

    return (
        <Flex
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            bg="linear-gradient(90deg, rgba(68,74,83,0.8) 0%, rgba(68,74,83,0.3) 50%, rgba(68,74,83,0.8) 100%), url('src/assets/images/login-couch.jpeg')"
            bgSize='cover'
            bgPosition='center'
            align='center'
            justify='center'>
            <Box
                h='fit-content'
                sx={{ bg: 'rgba(2, 24, 37, 0.8)' }}
                border='2px solid'
                borderColor='brand.500'
                rounded='md' boxShadow='2xl'
                color='brand.600'
                my={10}
                align='center'>
                <Box align='center' p={10} bg='brand.500'>
                    <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
                    <Text as='cite'>...where home becomes art...</Text>
                </Box>
                <VStack p={10}>
                    <FormControl isInvalid={states.usernameError} isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' placeholder='Enter username' onChange={(e) => states.setUsername(e.target.value)} bg='brand.600' color='brand.500' />
                        {states.usernameError && (
                            <FormErrorMessage>Username is incorrect.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={states.passwordError} isRequired='true' pr={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                type={states.show ? 'text' : 'password'}
                                placeholder='Enter password'
                                bg='brand.600'
                                color='brand.500'
                                onChange={(e) => states.setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button colorScheme='blackAlpha' size='sm' onClick={() => states.setShow(!states.show)}>
                                    {states.show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {states.passwordError && (
                            <FormErrorMessage>Password is incorrect.</FormErrorMessage>
                        )}
                    </FormControl>
                </VStack>
                <VStack mb={8}>
                    <HStack>
                        <Button colorScheme='telegram' onClick={() => {
                            useLogIn({ states, from });
                        }}>Log In</Button>
                        <Button colorScheme='whiteAlpha' onClick={() => states.navigate('/')}>Cancel</Button>
                    </HStack>
                    <Text fontSize='sm'>Not yet a member? Join us now!
                        <Button colorScheme='orange' variant='link' ml={2} onClick={() => states.navigate('../sign-up')}>Sign Up</Button>
                    </Text>

                </VStack>
            </Box>
        </Flex>
    );
};

export default LogIn;
