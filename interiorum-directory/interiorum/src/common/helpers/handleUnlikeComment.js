import { removeLikeToComment } from '../../services/comment.services';
import { removeLikedCommentToUser } from '../../services/users.service';

const handleUnlikeComment = ({ commentId, handle }) => {
    removeLikeToComment({ commentId, handle });
    removeLikedCommentToUser({ commentId, handle });
    return;
};

export default handleUnlikeComment;
