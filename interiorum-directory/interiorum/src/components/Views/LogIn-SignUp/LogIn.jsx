import { FormControl, FormLabel, Input, FormErrorMessage, Box, Heading, Text, Button, HStack, VStack, Flex, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { UserContext } from '../../../UserContext/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const toast = useToast();

    const handleLogin = () => {
        setUsernameError(username !== user.username);
        setPasswordError(password !== user.password);
        if (username === user.username && password === user.password) {
            status.setLoginState(true);
            navigate(from, { replace: true });
            toast({
                title: 'Welcome back!',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            });
        }
    };

    const [show, setShow] = useState(false);

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
                    <FormControl isInvalid={usernameError} isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} bg='brand.600' color='brand.500' />
                        {usernameError && (
                            <FormErrorMessage>Username is incorrect.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={passwordError} isRequired='true' pr={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                bg='brand.600'
                                color='brand.500'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button colorScheme='blackAlpha' size='sm' onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {passwordError && (
                            <FormErrorMessage>Password is incorrect.</FormErrorMessage>
                        )}
                    </FormControl>
                </VStack>
                <VStack mb={8}>
                    <HStack>
                        <Button colorScheme='telegram' onClick={handleLogin}>Log In</Button>
                        <Button colorScheme='whiteAlpha' onClick={() => navigate('/')}>Cancel</Button>
                    </HStack>
                    <Text fontSize='sm'>Not yet a member? Join us now!
                        <Button colorScheme='orange' variant='link' ml={2} onClick={() => navigate('../sign-up')}>Sign Up</Button>
                    </Text>

                </VStack>
            </Box>
        </Flex>
    );
};

export default LogIn;


//
// const LogIn = ({ formVariant='login' }) => {
//     const user = useContext(AuthContext);
//     console.log(user);

//     const [variant, setVariant] = useState(formVariant);

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleFirstNameChange = (e) => setFirstName(e.target.value);
//     const handleLastNameChange = (e) => setLastName(e.target.value);
//     const handleUsernameChange = (e) => setUsername(e.target.value);
//     const handleEmailChange = (e) => setEmail(e.target.value);
//     const handlePasswordChange = (e) => setPassword(e.target.value);
//     const isError = !email.includes('@');

//     return (
//         <Container className='main-view' id='log-in-view' maxW='container' bgImage="url('src/assets/images/login-img.jpeg')" bgSize="100%" bgPosition='center' centerContent>
//             <Box bg='brand.400' border='2px solid' borderColor='brand.500' rounded='md' boxShadow='2xl' color='brand.600' my={10} align='center'>
//                 <Box align='center' p={10} bg='brand.500'>
//                     <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
//                     <Text as='cite'>...where home becomes art...</Text>
//                 </Box>
//                 <HStack h={variant === 'signup' ? '350px' : ''} p={10}>
//                     <FormControl isRequired='true' pr={4}>
//                         <FormLabel>Username</FormLabel>
//                         <Input type='text' value={username} onChange={handleUsernameChange} bg='brand.600' color='brand.500' />
//                         <FormLabel>Password</FormLabel>
//                         <Input type='text' value={password.split('').map(() => '•').join('')} onChange={handlePasswordChange} bg='brand.600' color='brand.500' />
//                     </FormControl>
//                     {variant === 'signup' &&
//                     <>
//                         <Divider orientation='vertical' />
//                         <FormControl isRequired='true' pl={4}>
//                             <FormLabel>First Name</FormLabel>
//                             <Input type='text' value={firstName} onChange={handleFirstNameChange} bg='brand.600' color='brand.500' />
//                             <FormLabel>Last Name</FormLabel>
//                             <Input type='text' value={lastName} onChange={handleLastNameChange} bg='brand.600' color='brand.500' />
//                             <FormControl isInvalid={isError} isRequired='true' >
//                                 <FormLabel>Email</FormLabel>
//                                 <Input type='email' value={email} onChange={handleEmailChange} bg='brand.600' color='brand.500'/>
//                                 {!isError ? (
//                                     <FormHelperText>
//                                         Enter the email you'd like to receive the newsletter on.
//                                     </FormHelperText>
//                                 ) : (
//                                     <FormErrorMessage>Email is required.</FormErrorMessage>
//                                 )}
//                             </FormControl>
//                         </FormControl>
//                     </>
//                     }
//                 </HStack>
//                 <VStack mb={8}>
//                     {variant === 'login' ?
//                         (<>
//                             <Button colorScheme='blue' onClick={() => user.setLoginState(true)}>Log In</Button>
//                             <Text fontSize='sm' as='caption'>Not yet a member? Join us now!
//                                 <Button variant='link' ml={2} onClick={() => setVariant('signup')}>Sign Up</Button>
//                             </Text>
//                         </>) :
//                         (<>
//                             <Button colorScheme='orange' onClick={() => user.setLoginState(true)}>Sign Up</Button>
//                             <Text fontSize='sm' as='caption'>Already have an account?
//                                 <Button variant='link' ml={2} onClick={() => setVariant('login')}>Log In</Button>
//                             </Text>
//                         </>)
//                     }
//                 </VStack>
//             </Box>
//         </Container>
//     );
// };

// export default LogIn;
