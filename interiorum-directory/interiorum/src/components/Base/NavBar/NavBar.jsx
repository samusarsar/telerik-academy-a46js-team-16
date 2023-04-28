import { NavLink } from 'react-router-dom';

import { Flex, Box, Heading, Spacer } from '@chakra-ui/react';

import './NavBar.css';

const NavBar = () => {
    return (
        <Flex as='nav' className="navbar" bg='#DBCCBD' justify="space-around" wrap='wrap' gap='1'>
            {/* <img src="" alt="" /> */}
            <Heading as='h2'>INTERIORUM</Heading>
            <Spacer />
            <Box as='li' w='150px' h ='50px'>
                <NavLink to='home'>Home</NavLink>
            </Box>
            <Box as='li'w='150px' h ='50px'>
                <NavLink to='forum'>Forum</NavLink>
            </Box>
            <Box as='li'w='150px' h ='50px'>
                <NavLink to='about'>About</NavLink>
            </Box>
            <Box as='li'w='150px' h ='50px'>
                Log In
            </Box>
        </Flex>
    );
};

export default NavBar;
