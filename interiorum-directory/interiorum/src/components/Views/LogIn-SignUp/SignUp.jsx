import { FormControl, FormLabel, Input, FormErrorMessage, Box, Heading, Text, Button, HStack, Divider, VStack, Flex } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { UserContext } from '../../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);
    console.log(user);
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
            navigate('../profile');
        }
    };

    return (
        <Flex
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            sx={{
                bg: 'linear-gradient(90deg, rgba(68,74,83,0.8) 0%, rgba(68,74,83,0.3) 50%, rgba(68,74,83,0.8) 100%), url(\'src/assets/images/login-couch.jpeg\')',
                bgSize: 'cover',
                bgPosition: 'center',
            }}
            align='center'
            justify='center'>
            <Box
                h='fit-content'
                sx={{ bg: 'rgba(2, 24, 37, 0.8)' }}
                border='2px solid'
                borderColor='brand.500'
                rounded='md'
                boxShadow='2xl'
                color='brand.600'
                my={10}
                align='center'>
                <Box align='center' p={10} bg='brand.500'>
                    <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
                    <Text as='cite'>...where home becomes art...</Text>
                </Box>
                <HStack h='350px' p={10}>
                    <VStack>
                        <FormControl isInvalid={usernameError} isRequired='true' pr={4}>
                            <FormLabel>Username</FormLabel>
                            <Input type='text' placeholder='johndoe123' onChange={(e) => setUsername(e.target.value)} bg='brand.600' color='brand.500' />
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
                            <Input type='text' placeholder='Doe' onChange={(e) => setLastName(e.target.value)} bg='brand.600' color='brand.500' />
                            <FormErrorMessage>Last name should be between 4 and 32 characters.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={emailError} isRequired='true' >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='johndoe@interiorum.bg' onChange={(e) => setEmail(e.target.value)} bg='brand.600' color='brand.500'/>
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
            </Box>
        </Flex>
    );
};

export default SignUp;
