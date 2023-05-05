import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const AccountBase = ({ children }) => {
    return (
        <Flex
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            bg="linear-gradient(90deg, rgba(68,74,83,0.8) 0%, rgba(68,74,83,0.3) 50%, rgba(68,74,83,0.8) 100%), 
                url('https://images.unsplash.com/photo-1606744888344-493238951221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')"
            bgSize='cover'
            bgPosition='center'
            align='center'
            justify='center'>
            <Box
                h='fit-content'
                sx={{ bg: 'rgba(2, 24, 37, 0.8)' }}
                border='2px solid'
                borderColor='brand.500'
                rounded='md' boxShadow='2xl'
                color='brand.600'
                my={10}
                align='center'>
                <Box align='center' p={10} bg='brand.500'>
                    <Heading as='h1' size='lg'>Welcome to INTERIORUM</Heading>
                    <Text as='cite'>...where home becomes art...</Text>
                </Box>
                { children }
            </Box>
        </Flex>
    );
};

export default AccountBase;
