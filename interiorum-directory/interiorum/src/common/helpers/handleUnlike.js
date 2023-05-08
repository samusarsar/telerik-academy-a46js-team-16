import { removeLikeToPost } from "../../services/post.service";
import { removeLikedPostToUser } from "../../services/users.service";

const handleUnlike = ({ postId, handle }) => {
    removeLikeToPost({ postId, handle });
    removeLikedPostToUser({ postId, handle });
    return;
};

export default handleUnlike;
