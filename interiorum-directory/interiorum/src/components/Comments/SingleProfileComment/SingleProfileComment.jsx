import { Text, Box, HStack, Spacer, Card, Image, Stack, CardBody, CardFooter, Heading, Flex } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostById } from '../../../services/post.service';
import { AppContext } from '../../../context/AppContext/AppContext';
import DeleteButton from '../../Base/DeleteButton/DeleteButton';
import { deleteComment } from '../../../services/comment.services';

const SingleProfileComment = ({ comment, large = false }) => {
    const body = comment.content.length > 100 ? comment.content.slice(0, 99) + '...' : comment.content;

    const { userData } = useContext(AppContext);

    const [postTitle, setPostTitle] = useState(null);

    useEffect(() => {
        getPostById(comment.postId)
            .then(data => setPostTitle(data.title));
    }, []);

    // useEffect(() => console.log(comment.author), [])
    if (comment) {
        return (
            <Box textAlign='left' px={2}>
                <HStack justify='left' py={2}>
                    <Text fontSize='0.8em' >
                        <Link to={`../../profile/${comment.author}`}><b>{comment.author}</b></Link> commented on:
                    </Text>
                    <Spacer />
                    <Text fontSize='xs' color='gray.500'>
                        On {comment.createdOn}
                    </Text>
                </HStack >

                <Flex>
                    <Link to={`../../post/${comment.postId}`}>
                        <Heading as='h5' size='sm' py={3}>
                            {postTitle && postTitle}
                        </Heading>
                    </Link>
                    <Spacer />
                    {(userData.handle === comment.author) &&
                        <DeleteButton deleteType={'comment'} single={true} deleteFunction={() => deleteComment(userData.handle, comment.commentId)} />
                    }
                    {large &&
                        <Text py={3} color='brand.400' fontSize='0.9em'>
                            {body}
                        </Text>}
                </Flex>

            </Box>
        );
    }

    return null;
};

export default SingleProfileComment;
