import { FormControl, FormLabel, Input, FormErrorMessage, Box, Heading, Text, Button, HStack, Divider, VStack, Flex, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { UserContext } from '../../../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import AccountBase from '../../Account/AccountBase';

const SignUp = () => {
    const status = useContext(AppContext);
    const user = useContext(UserContext);

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(false);

    const toast = useToast();

    const handleSignUp = () => {
        // setUsernameError(snapshot.exists());
        setPasswordError(password.length < 6);
        setRePasswordError(rePassword !== password);
        setFirstNameError(firstName.length < 4 || firstName.length > 32);
        setLastNameError(lastName.length < 4 || lastName.length > 32);
        // setEmailError(!email.includes('@') || snapshot.exists());
        if (// (!snapshot.exists()) &&
            (password.length >= 6) &&
            (rePassword === password) &&
            (firstName.length > 4 || firstName.length < 32) &&
            (lastName.length > 4 || lastName.length < 32) &&
            (email.includes('@')
            // || !snapshot.exists()
            )) {
            status.setLoginState(true);
            user.setUsername(username);
            user.setPassword(password);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            console.log(user);
            navigate('/home');
            toast({
                title: 'Welcome to your Interiorum!',
                description: 'You have successfully signed up. Have fun!',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            });
        }
    };

    return (
        <AccountBase>
            <HStack h='350px' p={10}>
                <VStack>
                    <FormControl isInvalid={usernameError} isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' placeholder='johnjordan123' onChange={(e) => setUsername(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Username is taken.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordError} isRequired='true' pr={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type='text' onChange={(e) => setPassword(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Password should be more than 6 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={rePasswordError} isRequired='true' pr={4}>
                        <FormLabel>Confirm</FormLabel>
                        <Input type='text' onChange={(e) => setRePassword(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Password confirmation did not match.</FormErrorMessage>
                    </FormControl>
                </VStack>
                <Divider orientation='vertical' />
                <VStack pl={4}>
                    <FormControl isInvalid={firstNameError} isRequired='true'>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' placeholder='John' onChange={(e) => setFirstName(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>First name should be between 4 and 32 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={lastNameError} isRequired='true'>
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' placeholder='Jordan' onChange={(e) => setLastName(e.target.value)} bg='brand.600' color='brand.500' />
                        <FormErrorMessage>Last name should be between 4 and 32 characters.</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={emailError} isRequired='true' >
                        <FormLabel>Email</FormLabel>
                        <Input type='email' placeholder='johnjordan@interiorum.bg' onChange={(e) => setEmail(e.target.value)} bg='brand.600' color='brand.500'/>
                        <FormErrorMessage>Email should be valid and unique.</FormErrorMessage>
                    </FormControl>
                </VStack>
            </HStack>
            <VStack mb={8}>
                <HStack>
                    <Button colorScheme='orange' onClick={handleSignUp}>Sign Up</Button>
                    <Button colorScheme='whiteAlpha' onClick={() => navigate('/')}>Cancel</Button>
                </HStack>
                <Text fontSize='sm'>Already have an account?
                    <Button colorScheme='telegram' variant='link' ml={2} onClick={() => navigate('../log-in')}>Log In</Button>
                </Text>
            </VStack>
        </AccountBase>
    );
};

export default SignUp;
