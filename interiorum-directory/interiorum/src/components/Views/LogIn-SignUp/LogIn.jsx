import { Container, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Box, Heading, Text, Button, HStack, Divider, ButtonGroup, VStack, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LogIn = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <Container
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            bgImage="url('src/assets/images/login-img.jpeg')"
            bgSize="100%"
            bgPosition='center'
            centerContent>
            <Box bg='brand.400' border='2px solid' borderColor='brand.500' rounded='md' boxShadow='2xl' color='brand.600' my={10} align='center'>
                <Box align='center' p={10} bg='brand.500'>
                    <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
                    <Text as='cite'>...where home becomes art...</Text>
                </Box>
                <HStack p={10}>
                    <FormControl isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} onChange={handleUsernameChange} bg='brand.600' color='brand.500' />
                        <FormLabel>Password</FormLabel>
                        <Input type='text' value={password.split('').map(() => '•').join('')} onChange={handlePasswordChange} bg='brand.600' color='brand.500' />
                    </FormControl>
                </HStack>
                <VStack mb={8}>
                    <Button colorScheme='telegram' onClick={() => {
                        user.setLoginState(true);
                        navigate(from, { replace: true });
                    }}>Log In</Button>
                    <Text fontSize='sm' as='caption'>Not yet a member? Join us now!
                        <Button colorScheme='orange' variant='link' ml={2} onClick={() => navigate('../sign-up')}>Sign Up</Button>
                    </Text>

                </VStack>
            </Box>
        </Container>
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
