import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const SinglePost = ({ post, large=false }) => {

    const body = post.content.length > 100 ? post.content.slice(0,99) + '...' : post.content;

    if (post) {
        return (
            <Box textAlign='left' p={2} >
                <Heading as='h5' size='sm'><Link to={`../../post/${post.title}`}>{post.title}</Link></Heading>

                {large && <Text fontSize='sm' my={3}>{body}</Text>}
                <HStack justify='left' py={2}>
                    <Text fontSize='0.8em'>Posted by {post.author}</Text>
                    <Text fontSize='0.8em' color='gray.500'>On {post.createdOn}</Text>
                    <Spacer/>
                    <AvatarGroup size='sm' max={3} fontSize='0.8em' spacing='-0.5rem' >
                        <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                        <Avatar name='Segun Adebayo' src='https://bit.ly/code-beast' />
                        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                        <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                        <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                    </AvatarGroup>
                </HStack>
            </Box>
        );
    };

    return null;
};

export default SinglePost;
