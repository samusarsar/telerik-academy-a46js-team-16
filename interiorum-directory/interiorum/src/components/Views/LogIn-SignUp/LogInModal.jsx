// eslint-disable-next-line max-len
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useDisclosure, Text, HStack, FormErrorMessage, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { UserContext } from '../../../UserContext/UserContext';

const LogInModal = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = () => {
        if (user.username !== username) {
            setUsernameError(true);
        }
        if (user.password !== password) {
            setPasswordError(true);
        }
        if (user.username === username) setUsernameError(false);
        if (user.password === password) setPasswordError(false);
        if (user.username === username && user.password === password) {
            status.setLoginState(true);
            onClose();
        }
    };

    const [show, setShow] = useState(false);

    return (
        <>
            <Button colorScheme='telegram' variant='ghost' onClick={onOpen}>Log In</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setUsername('');
                    setUsernameError(false);
                    setPassword('');
                    setPasswordError(false);
                    onClose();
                }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent px={8} py={2} bg='brand.600'>
                    <ModalHeader>Log into your <i>INTERIORUM</i> account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={usernameError}>
                            <FormLabel>Username</FormLabel>
                            <Input value={username} placeholder='Username' onChange={handleUsernameChange}/>
                            {usernameError && (
                                <FormErrorMessage>Username is incorrect.</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={passwordError} mt={4}>
                            <FormLabel>Password</FormLabel>
                            {/* <Input value={password.split('').map(() => '•').join('')} placeholder='Password' onChange={handlePasswordChange}/> */}
                            <InputGroup size='md'>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    bg='brand.600'
                                    color='brand.500'
                                    onChange={handlePasswordChange}
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
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='telegram' mr={3} onClick={() => {
                            handleLogin();
                        }}>
                            Log In
                        </Button>
                        <Button colorScheme='blackAlpha' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    <HStack justify='right' mb={4} mr={6}>
                        <Text fontSize='sm'>Not yet a member? Join us now!
                            <Button colorScheme='orange' variant='link' ml={2} onClick={() => {
                                navigate('sign-up');
                                onClose();
                            }}>Sign Up</Button>
                        </Text>
                    </HStack>
                </ModalContent>
            </Modal>
        </>);
};

export default LogInModal;
