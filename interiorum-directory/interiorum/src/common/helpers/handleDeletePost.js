import { deletePost } from '../../services/post.service';

const handleDeletePost = ( postId, handle ) => {
    console.log(postId);
    return deletePost(postId, handle);
};

export default handleDeletePost;
