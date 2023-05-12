import { Avatar, Button, FormControl, FormErrorMessage, HStack, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { addComment } from '../../../services/comment.services';

import PropTypes from 'prop-types';

const CreateComment = ({ postId }) => {
    const { userData } = useContext(AppContext);

    const toast = useToast();

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(false);

    const handleSubmit = () => {
        if (!comment || comment.length > 1000) {
            setCommentError('Comments should be between 1 and 1000 characters.');
            return;
        }

        addComment(comment, postId, userData.handle)
            .then(() => {
                setComment('');
                setCommentError(false);
            })
            .catch(() => toast({
                title: 'Error uploading comment.',
                description: 'Please try again later!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            }));
        return;
    };

    if (userData) {
        return (
            <VStack align='end' w='80%' gap={2} pt={3}>
                <HStack justify='center' align='start' w='100%'>
                    <Avatar
                        src={userData.avatarURL}
                        name={`${userData.firstName} ${userData.lastName}`}
                        size='md'
                        mx={2}/>
                    <FormControl isInvalid={commentError}>
                        <Textarea bg='brand.600' placeholder='Enter your comment here' value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <FormErrorMessage>{commentError}</FormErrorMessage>
                    </FormControl>
                </HStack>
                <Button colorScheme='orange' onClick={handleSubmit}>Submit</Button>
            </VStack>
        );
    };

    return null;
};

CreateComment.propTypes = {
    postId: PropTypes.string.isRequired,
};
export default CreateComment;
