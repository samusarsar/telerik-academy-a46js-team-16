// eslint-disable-next-line max-len
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useDisclosure, Text, HStack, FormErrorMessage, InputGroup, InputRightElement } from '@chakra-ui/react';
import handleLogIn from '../../common/helpers/handleLogIn';
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
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody pb={6}>
                        <FormControl isInvalid={states.emailError}>
                            <FormLabel>Email</FormLabel>
                            <Input bg='brand.600' color='brand.500' placeholder='Enter email' onChange={(e) => states.setEmail(e.target.value)}/>
                            {states.emailError && (
                                <FormErrorMessage>{states.emailError}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={states.passwordError} mt={4}>
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
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='telegram' mr={3} onClick={() => {
                            handleLogIn({ states, onClose });
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
