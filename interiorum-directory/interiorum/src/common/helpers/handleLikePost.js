import { addLikeToPost } from '../../services/post.service';
import { addLikedPostToUser } from '../../services/users.service';

const handleLikePost = ({ postId, handle }) => {
    addLikeToPost({ postId, handle });
    addLikedPostToUser({ postId, handle });
    return;
};

export default handleLikePost;
