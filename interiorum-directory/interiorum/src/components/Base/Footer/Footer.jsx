import {
    Box,
    Container,
    Icon,
    Image,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
    const toast = useToast();

    const handleSocials = (network) => {
        toast({
            title: `We are not on ${network} yet!`,
            description: 'Stay tuned and follow us when we become live!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    return (
        <Box
            bg='brand.600'
            color='gray.700'>
            <Container
                as={Stack}
                maxW='6xl'
                py={4}
                spacing={4}
                justify='center'
                align='center'>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Flogo.png?alt=media&token=dfd1dd62-93fc-4de0-a77f-4e941c4e09a5'
                    boxSize='80px'/>
                <Stack direction={'row'} spacing={6}>
                    <Link to='../../home' >Home</Link>
                    <Link to='../../forum' >Forum</Link>
                    <Link to='../../about' >About</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle='solid'
                borderColor='gray.200'>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 Team 16 - interiorum. All rights reserved</Text>
                    <Stack direction='row' spacing={6}>
                        <Icon as={BsTwitter} bg='transparent' onClick={() => handleSocials('Twitter')}/>
                        <Icon as={BsYoutube} bg='transparent' onClick={() => handleSocials('YouTube')}/>
                        <Icon as={BsInstagram} bg='transparent' onClick={() => handleSocials('Instagram')}/>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
