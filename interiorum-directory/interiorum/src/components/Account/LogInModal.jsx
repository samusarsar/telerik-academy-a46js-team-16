// eslint-disable-next-line max-len
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useDisclosure, Text, HStack, FormErrorMessage, InputGroup, InputRightElement } from '@chakra-ui/react';
import useLogIn from '../../hooks/useLogIn';
import useLogInStates from '../../hooks/useLogInStates';

const LogInModal = () => {
    const states = useLogInStates();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme='telegram' variant='ghost' onClick={onOpen}>Log In</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    states.setUsername('');
                    states.setUsernameError(false);
                    states.setPassword('');
                    states.setPasswordError(false);
                    onClose();
                }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent px={8} py={2} sx={{ bg: 'rgba(2, 24, 37, 0.9)' }} color='brand.600'>
                    <ModalHeader>Log into your <i>INTERIORUM</i> account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={states.usernameError}>
                            <FormLabel>Username</FormLabel>
                            <Input bg='brand.600' color='brand.500' placeholder='Enter username' onChange={(e) => states.setUsername(e.target.value)}/>
                            {states.usernameError && (
                                <FormErrorMessage>Username is incorrect.</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={states.passwordError} mt={4}>
                            <FormLabel>Password</FormLabel>
                            {/* <Input value={password.split('').map(() => '•').join('')} placeholder='Password' onChange={handlePasswordChange}/> */}
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
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='telegram' mr={3} onClick={() => {
                            useLogIn({ states, onClose });
                        }}>
                            Log In
                        </Button>
                        <Button colorScheme='whiteAlpha' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    <HStack justify='right' mb={4} mr={6}>
                        <Text fontSize='sm'>Not yet a member? Join us now!
                            <Button colorScheme='orange' variant='link' ml={2} onClick={() => {
                                states.navigate('sign-up');
                                onClose();
                            }}>Sign Up</Button>
                        </Text>
                    </HStack>
                </ModalContent>
            </Modal>
        </>);
};

export default LogInModal;
