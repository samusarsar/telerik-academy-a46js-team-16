import { Box, Flex, Heading, Text, VStack, Image } from '@chakra-ui/react';


const HomeHeader = () => {
    return (
        <VStack
            id='img'
            w='100%'
            py={20}
            bg='brand.200'
            bgImg="url('https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fhome-cover.png?alt=media&token=c7198ad1-0346-4f7c-b1d3-1f01fb70c979')"
            bgSize='100%' bgPosition='center'
            bgRepeat='no-repeat'
            justify='center'>
            <Flex bg='brand.600' p={5} borderRadius={8} sx={{ background: 'rgba(238, 237, 237, 0.4)' }} align='center' gap={5}>
                <Image
                    src='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Flogo.png?alt=media&token=dfd1dd62-93fc-4de0-a77f-4e941c4e09a5'
                    boxSize='150px'/>
                <Box>
                    <Heading as='h1' size='2xl'>interiorum</Heading>
                    <Text fontSize='lg'><i>...where home becomes art...</i></Text>
                </Box>
            </Flex>
        </VStack>
    );
};

export default HomeHeader;
