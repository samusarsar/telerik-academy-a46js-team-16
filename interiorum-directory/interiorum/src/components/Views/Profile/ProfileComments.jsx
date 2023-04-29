import { Container, Heading } from "@chakra-ui/react";
import ProfileCommentFeed from "../../Comments/ProfileCommentFeed/ProfileCommentFeed";

const ProfileComments = ({ comments }) => {
    return (
        <Container display={'flex'} flexDirection={'column'} align={'center'} bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='md'>{comments.length} Comments</Heading>
            <ProfileCommentFeed comments={comments}></ProfileCommentFeed>
        </Container>
    );
};

export default ProfileComments;
