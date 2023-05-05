import { useParams } from 'react-router-dom';

const PostDetails = () => {

    const { postTitle } = useParams();
    console.log(postTitle);

    return (
        <>
            <p>{postTitle}</p>
        </>
    );
};

export default PostDetails;
