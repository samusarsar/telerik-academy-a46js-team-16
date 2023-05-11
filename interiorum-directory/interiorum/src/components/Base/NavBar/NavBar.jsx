import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { Heading, Spacer, HStack, Button, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, Box, useToast, Link, Avatar } from '@chakra-ui/react';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import LogInModal from '../../Account/LogInModal';
import handleLogOut from '../../../common/helpers/handleLogOut';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const NavBar = () => {
    const { user, userData, setContext } = useContext(AppContext);
    const [menuAvatar, setMenuAvatar] = useState(null);
    const [inProfile, setInProfile] = useState(false);

    const navigate = useNavigate();
    const { handle } = useParams();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (userData) {
            return onValue(ref(db, `users/${userData.handle}/avatarURL`), (snapshot) => {
                const data = snapshot.val();
                setMenuAvatar(data);
            });
        }

        return undefined;
    });

    useEffect(() => {
        if (userData) {
            setInProfile(userData.handle === handle);
        }
    }, [handle]);

    return (
        <>
            <HStack as='nav' className="navbar" bg='white' wrap='wrap' spacing={30} p={4}>
                <HStack _hover={{ cursor: 'pointer' }} onClick={() => navigate('home')} >
                    <Image
                        src='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Flogo.png?alt=media&token=dfd1dd62-93fc-4de0-a77f-4e941c4e09a5'
                        boxSize='80px'/>
                    <Heading as='h2'>interiorum</Heading>
                </HStack>
                <Spacer />
                <Link as={NavLink} rounded='lg' px={2} py={2} to='home' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}>Home</Link>
                <Link as={NavLink} rounded='lg' px={2} py={2} to='forum' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}>Forum</Link>
                <Link as={NavLink} rounded='lg' px={2} py={2} to='about' _activeLink={{ fontWeight: 'bold', color: 'brand.300' }}
                    _hover={{ textDecoration: 'none', bg: 'blackAlpha.200' }}>About</Link>
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
                            <MenuButton minW='fit-content' px={3} onMouseEnter={onOpen} onClick={() => navigate('my-profile')}>
                                <HStack gap={2}>
                                    <Avatar src={menuAvatar}
                                        name={userData.handle}
                                        boxSize='40px' />
                                    <Link as={NavLink} to={'my-profile'} fontWeight={ `${inProfile ? 'bold' : ''}`} color={ `${inProfile ? 'brand.100' : ''}`}>
                                        {userData && userData.handle}
                                    </Link>
                                </HStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem color='gray.700' transition='.1s ease-in-out'
                                    _hover={{ bg: 'blackAlpha.100' }}
                                    onClick={() => navigate('my-profile')}>My Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem color='brand.300' transition='.1s ease-in-out'
                                    _hover={{ bg: 'brand.300', color: 'brand.600' }} onClick={() => handleLogOut({ setContext, onClose, navigate, toast })}>
                                    Log Out
                                </MenuItem>
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
