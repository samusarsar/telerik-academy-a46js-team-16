import { Button, FormControl, FormErrorMessage, HStack, Image, Textarea, VStack, useToast } from '@chakra-ui/react';
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
                    <Image
                        src={userData.avatarURL}
                        // eslint-disable-next-line max-len
                        fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                        w='45px'
                        rounded='full'
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
