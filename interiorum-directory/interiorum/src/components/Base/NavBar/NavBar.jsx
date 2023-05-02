import { NavLink, useNavigate } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, Flex, useDisclosure, Box, useToast } from '@chakra-ui/react';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { UserContext } from '../../../context/UserContext/UserContext';
import LogInModal from '../../Views/LogIn-SignUp/LogInModal';
import useLogOut from '../../../hooks/useLogOut';

const NavBar = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <Box onMouseLeave={onClose} py={4}>
                        <Menu autoSelect={false} isLazy={true} isOpen={isOpen} unmount>
                            <MenuButton minW='fit-content' px={3} onMouseEnter={onOpen} >
                                <HStack>
                                    <Image src={user.avatar} fallbackSrc='src/assets/images/anon-user.jpg' rounded='full' boxSize='40px'></Image>
                                    <Text>{user.username}</Text>
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => navigate('profile')}>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem color='brand.300' _hover={{ bg: 'brand.300', color: 'brand.600' }} onClick={() => useLogOut({ status, onClose, toast })}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>) : (
                    <>
                        <LogInModal />
                        <Button colorScheme='orange' onClick={() => navigate('sign-up')}>Sign up</ Button>
                    </>
                )}
            </HStack>
        </>
    );
};

export default NavBar;
