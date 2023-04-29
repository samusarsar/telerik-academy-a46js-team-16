import { Box, Divider } from '@chakra-ui/react';
import SingleProfileCommentSmall from '../SingleProfileComment/SingleProfileComment';

const ProfileCommentFeed = ({ comments }) => {
    return (
        <Box py={4}>
            {comments.map(comment =>
                <>
                    <SingleProfileCommentSmall key={comment.id} comment={comment} />
                    <Divider borderColor='gray.400' w='95%'/>
                </>,
            )}
        </Box>
    );
};

export default ProfileCommentFeed;
