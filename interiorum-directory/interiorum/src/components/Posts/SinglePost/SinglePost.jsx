import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer } from '@chakra-ui/react';

const SinglePost = () => {
    return (
        <Box textAlign='left' p={2} >
            <Heading as='h5' size='sm'>Adjusting Visual Comfort Goodman Pendants</Heading>
            <HStack justify='left' py={2}>
                <Text fontSize='0.8em'>Posted by Jen M</Text>
                <Text fontSize='0.8em' color='gray.500'>14 hours ago</Text>
                <Spacer/>
                <AvatarGroup size='sm' max={3} fontSize='0.8em' spacing={0.1}>
                    <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                    <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                    <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                    <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                    <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                </AvatarGroup>
            </HStack>
        </Box>
    );
};

export default SinglePost;
