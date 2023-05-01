import { NavLink, useNavigate } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, Flex } from '@chakra-ui/react';

import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { UserContext } from '../../../UserContext/UserContext';
import LogInModal from '../../Views/LogIn-SignUp/LogInModal';

const NavBar = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            <HStack as='nav' className="navbar" bg='white' wrap='wrap' spacing={30} p={4}>
                <HStack>
                    <Image src='src/assets/images/logo.png' boxSize='80px'/>
                    <Heading as='h2'>INTERIORUM</Heading>
                </HStack>
                <Spacer />
                <NavLink to='home'>Home</NavLink>
                <NavLink to='forum'>Forum</NavLink>
                <NavLink to='about'>About</NavLink>
                {status.isLoggedIn ? (
                    <>
                        <Menu autoSelect={false} isLazy={true} unmount>
                            <MenuButton minW='fit-content' px={3}>
                                <HStack>
                                    <Image src={user.avatar} fallbackSrc='src/assets/images/anon-user.jpg' rounded='full' boxSize='40px'></Image>
                                    <Text>{user.username}</Text>
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => navigate('profile')}>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem color='brand.300' _hover={{ bg: 'brand.300', color: 'brand.600'}} onClick={() => status.setLoginState(false)}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
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
