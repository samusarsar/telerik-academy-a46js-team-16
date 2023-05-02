import { NavLink, useNavigate } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, Flex, useDisclosure, Box, useToast } from '@chakra-ui/react';

import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext/AuthContext';
import { UserContext } from '../../../UserContext/UserContext';
import LogInModal from '../../Views/LogIn-SignUp/LogInModal';

const NavBar = () => {
    const status = useContext(AuthContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const handleLogOut = () => {
        status.setLoginState(false);
        onClose();
        toast({
            title: 'See you soon!',
            description: 'You have successfully logged out.',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

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
                                <MenuItem color='brand.300' _hover={{ bg: 'brand.300', color: 'brand.600'}} onClick={handleLogOut}>Log Out</MenuItem>
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
