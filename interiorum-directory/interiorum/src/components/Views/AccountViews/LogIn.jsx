import { FormControl, FormLabel, Input, FormErrorMessage, Text, Button, HStack, VStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import useLogIn from '../../../hooks/useLogIn';
import useLogInStates from '../../../hooks/useLogInStates';
import AccountBase from '../../Account/AccountBase';

const LogIn = () => {
    const states = useLogInStates();

    const location = useLocation();
    const from = location.state?.from || '/';

    return (
        <AccountBase>
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
        </AccountBase>
    );
};

export default LogIn;
