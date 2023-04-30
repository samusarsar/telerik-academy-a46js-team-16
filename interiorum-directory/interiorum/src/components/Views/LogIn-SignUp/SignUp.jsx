import { FormControl, FormLabel, Input, FormErrorMessage, Box, Heading, Text, Button, HStack, Divider, VStack, Flex } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const isError = !email.includes('@');

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
                    <FormControl isRequired='true' pr={4}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' value={username} onChange={handleUsernameChange} bg='brand.600' color='brand.500' />
                        <FormLabel>Password</FormLabel>
                        <Input type='text' value={password.split('').map(() => '•').join('')} onChange={handlePasswordChange} bg='brand.600' color='brand.500' />
                    </FormControl>
                    <Divider orientation='vertical' />
                    <FormControl isRequired='true' pl={4}>
                        <FormLabel>First Name</FormLabel>
                        <Input type='text' value={firstName} onChange={handleFirstNameChange} bg='brand.600' color='brand.500' />
                        <FormLabel>Last Name</FormLabel>
                        <Input type='text' value={lastName} onChange={handleLastNameChange} bg='brand.600' color='brand.500' />
                        <FormControl isInvalid={isError} isRequired='true' >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={email} onChange={handleEmailChange} bg='brand.600' color='brand.500'/>
                            {isError && (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )}
                        </FormControl>
                    </FormControl>
                </HStack>
                <VStack mb={8}>
                    <HStack>
                        <Button colorScheme='orange' onClick={() => {
                            user.setLoginState(true);
                            navigate(from, { replace: true });
                        }}>Sign Up</Button>
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
