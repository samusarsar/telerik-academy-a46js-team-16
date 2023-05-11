import {
    Box,
    Container,
    IconButton,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

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
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Flogo.png?alt=media&token=dfd1dd62-93fc-4de0-a77f-4e941c4e09a5'
                    boxSize='80px'/>
                <Stack direction={'row'} spacing={6}>
                    <Link href={'../../home'}>Home</Link>
                    <Link href={'../../forum'}>Forum</Link>
                    <Link href={'../../about'}>About</Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 Team 16 - interiorum. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <IconButton as={FaTwitter} bg='transparent' size='xs' onClick={() => handleSocials('Twitter')}/>
                        <IconButton as={FaYoutube} bg='transparent' size='xs' onClick={() => handleSocials('YouTube')}/>
                        <IconButton as={FaInstagram} bg='transparent' size='xs' onClick={() => handleSocials('Instagram')}/>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
