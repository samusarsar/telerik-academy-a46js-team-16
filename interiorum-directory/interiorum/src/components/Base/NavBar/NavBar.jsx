import { NavLink, useNavigate } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image } from '@chakra-ui/react';

import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import LogInModal from '../../Views/LogIn-SignUp/LogInModal';

const NavBar = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <HStack as='nav' className="navbar" bg='white' wrap='wrap' spacing={30} p={4}>
                {/* <img src="" alt="" /> */}
                <HStack>
                    <Image src='src/assets/images/logo.png' boxSize='80px'/>
                    <Heading as='h2'>INTERIORUM</Heading>
                </HStack>
                <Spacer />
                <NavLink to='home'>Home</NavLink>
                <NavLink to='forum'>Forum</NavLink>
                <NavLink to='about'>About</NavLink>
                {user.isLoggedIn ? (
                    <>
                        <NavLink to='profile'>Profile</NavLink>
                        <Button colorScheme='red' variant='outline' onClick={() => user.setLoginState(false)}>Log Out</ Button>
                    </>) : (
                    <>
                        <LogInModal />
                        <Button colorScheme='orange' onClick={() => navigate('sign-up')}>Sign up</ Button>
                    </>
                )}
            </HStack>
            {/*     <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder='First name' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>; */}
        </>
    );
};

export default NavBar;
