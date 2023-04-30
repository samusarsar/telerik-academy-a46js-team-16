import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button, useDisclosure, VStack, Text, Box, HStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext/AuthContext';

const LogInModal = () => {
    const user = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
        <>
            <Button colorScheme='telegram' variant='ghost' onClick={onOpen}>Log In</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log into your <i>INTERIORUM</i> account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder='Username' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='telegram' mr={3} onClick={() => {
                            user.setLoginState(true);
                            onClose();
                        }}>
                            Log In
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    <HStack justify='right' mb={4} mr={6}>
                        <Text fontSize='sm' as='caption'>Not yet a member? Join us now!
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
