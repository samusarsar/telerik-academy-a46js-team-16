import { Box, Flex, Heading, Text, VStack, Image } from '@chakra-ui/react';


const HomeHeader = () => {
    return (
        <VStack
            id='img'
            maxW='container'
            py={20}
            bg='brand.200'
            bgImg="url('src/assets/images/home-cover.png')"
            bgSize='100%' bgPosition='center'
            bgRepeat='no-repeat'
            justify='center'>
            <Flex bg='brand.600' p={5} borderRadius={8} sx={{ background: 'rgba(238, 237, 237, 0.4)' }} align='center' gap={5}>
                <Image src='src/assets/images/logo.png' boxSize='150px'/>
                <Box>
                    <Heading as='h1' size='2xl'>interiorum</Heading>
                    <Text fontSize='lg'><i>...where home becomes art...</i></Text>
                </Box>
            </Flex>
        </VStack>
    );
};

export default HomeHeader;
