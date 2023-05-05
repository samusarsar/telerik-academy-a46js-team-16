import { NavLink, useNavigate } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Box, useToast, Link, Text } from '@chakra-ui/react';

import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import LogInModal from '../../Account/LogInModal';
import handleLogOut from '../../../common/helpers/handleLogOut';

const NavBar = () => {
    const { user, userData, setContext } = useContext(AppContext);
    const navigate = useNavigate();

    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [inProfile, setInProfile] = useState(false);

    return (
        <>
            <HStack as='nav' className="navbar" bg='white' wrap='wrap' spacing={30} p={4}>
                <HStack _hover={{ cursor: 'pointer' }} onClick={() => {
                    navigate('home');
                    inProfile && setInProfile(false);
                }}>
                    <Image src='src/assets/images/logo.png' boxSize='80px'/>
                    <Heading as='h2'>INTERIORUM</Heading>
                </HStack>
                <Spacer />
                <Link as={NavLink} rounded='lg' px={2} py={2} to='home' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}
                    onClick={() => inProfile && setInProfile(false)}>Home</Link>
                <Link as={NavLink} rounded='lg' px={2} py={2} to='forum' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}
                    onClick={() => inProfile && setInProfile(false)}>Forum</Link>
                <Link as={NavLink} rounded='lg' px={2} py={2} to='about' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}
                    onClick={() => inProfile && setInProfile(false)}>About</Link>
                {(user && userData) ? (
                    <Box
                        borderRadius='xl'
                        onMouseLeave={onClose}
                        pb={2}
                        pt={3}
                        px={1}
                        bg={inProfile ? 'brand.500' : 'transparent'}
                        transition='.1s ease-in-out'
                        _hover={{ textDecoration: 'none', bg: `${inProfile ? 'brand.400' : 'brand.100'}`, color: `${inProfile ? 'brand.600' : 'brand.500'}` }}>
                        <Menu autoSelect={false} isLazy={true} isOpen={isOpen} unmount>
                            <MenuButton minW='fit-content' px={3} onMouseEnter={onOpen} onClick={() => {
                                navigate('my-profile');
                                setInProfile(true);
                            }}>
                                <HStack gap={2}>
                                    <Image src={user.avatar} fallbackSrc='src/assets/images/anon-user.jpg' rounded='full' boxSize='40px'></Image>
                                    <Link as={NavLink} to={'my-profile'} fontWeight={ `${inProfile ? 'bold' : ''}`} color={ `${inProfile ? 'brand.100' : ''}`}>{userData && userData.handle}</Link>
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem color='gray.700' transition='.1s ease-in-out'
                                    _hover={{ bg: 'blackAlpha.100' }}
                                    onClick={() => {
                                        navigate('my-profile');
                                        !inProfile && setInProfile(true);
                                    }}>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem color='brand.300' transition='.1s ease-in-out'
                                    _hover={{ bg: 'brand.300', color: 'brand.600' }} onClick={() => handleLogOut({ setContext, onClose, navigate, toast })}>
                                    Log Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>) : (
                    <>
                        {inProfile && setInProfile(false)}
                        <LogInModal />
                        <Button colorScheme='orange' onClick={() => navigate('sign-up')}>Sign up</ Button>
                    </>
                )}
            </HStack>
        </>
    );
};

export default NavBar;
