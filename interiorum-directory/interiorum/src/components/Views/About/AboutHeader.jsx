/* eslint-disable max-len */
import { Box, Flex, Heading, VStack, Image } from '@chakra-ui/react';


const AboutHeader = () => {
    return (
        <VStack
            id='img'
            maxW='container'
            py={20}
            bg="linear-gradient(90deg, rgba(68,74,83,0.8) 0%, rgba(68,74,83,0.3) 50%, rgba(68,74,83,0.8) 100%),
                url('https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80')"
            bgSize='100%'
            bgPosition='center'
            bgRepeat='no-repeat'
            justify='center'>
            <Flex bg='brand.600' p={5} borderRadius={8} sx={{ background: 'rgba(238, 237, 237, 0.4)' }} align='center' gap={5}>
                <Image src='src/assets/images/logo.png' boxSize='150px'/>
                <Box>
                    <Heading as='h1' size='2xl'>About Interiorum</Heading>
                </Box>
            </Flex>
        </VStack>
    );
};

export default AboutHeader;
