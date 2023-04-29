import { Box, HStack, Heading, Text } from '@chakra-ui/react';

const SingleComment = () => {
    return (
        <Box textAlign='left' p={2} >
            <Heading as='h5' size='sm'>Adjusting Visual Comfort Goodman Pendants</Heading>
            <HStack justify='left' py={2}>
                <Text fontSize='0.8em'>Commented by Jen M</Text>
                <Text fontSize='0.8em' color='gray.500'>14 hours ago</Text>
            </HStack>
        </Box>
    );
};

export default SingleComment;
