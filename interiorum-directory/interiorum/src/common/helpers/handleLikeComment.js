import { addLikeToComment } from '../../services/comment.services';
import { addLikedCommentToUser } from '../../services/users.service';

const handleLikeComment = ({ commentId, handle }) => {
    addLikeToComment({ commentId, handle });
    addLikedCommentToUser({ commentId, handle });
    return;
};

export default handleLikeComment;
